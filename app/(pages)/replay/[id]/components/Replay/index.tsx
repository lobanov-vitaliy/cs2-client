"use client";

import { useRef, useEffect, useMemo, useState, FC } from "react";
import { Application, Sprite, Container } from "pixi.js";
import { Viewport } from "pixi-viewport";
import RaplayRounds from "./RaplayRounds";
import { seconds2timestring } from "@/app/utils/time";
import { useIntl } from "react-intl";
import { getColorByTeamNumber } from "@/app/utils/team";
import ProgressBar from "./ProgressBar";
import Kills from "./Kills";
import Popover from "@/components/Popover";
import { ReplayObject, RoundDataType, TeamRoundType } from "../../types";
import Player from "../../entities/Player";
import GrenadeFactory from "../../entities/GrenadeFactory";
import C4 from "../../entities/C4";
import Team from "./Team";
import ReplayContainer from "../../replay-container";
import { MAP_POSITION } from "../../metadata";
import Weapon from "@/app/(pages)/match/[id]/components/Weapon";
const bullets = new Container();
const objects = new Container<ReplayObject>();
const players = new Container<Player>();

const config = {
  bomb_planted_tick: -1,
  frameRate: 60,
  tickRate: 64,
  roundTime: 115,
  bombTime: 40,
};

const Replay: FC<{
  width: number;
  height: number;
  app: Application;
  viewport: Viewport;
  match: any;
  rounds: Array<{
    round_number: number;
    winner_team_number: number;
    reason: number;
    teams: Array<TeamRoundType>;
  }>;
}> = ({ rounds, match, app, viewport, width, height }) => {
  const { $t } = useIntl();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTick, setCurrentTick] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [shacking, setShacking] = useState<
    Array<{ start: number; end: number }>
  >([]);
  const [isPause, setIsPause] = useState(false);
  const [round, setRound] = useState(1);
  const [kills, setKills] = useState<
    Array<{
      user_steamid: string;
      assister_steamid?: string;
      attacker_steamid?: string;
      weapon: string;
      headshot: boolean;
      noscope: boolean;
      penetrated: boolean;
      attackerblind: boolean;
      assistedflash: boolean;
      thrusmoke: boolean;
      seconds: number;
      tick: number;
    }>
  >([]);
  const [data, setData] = useState<RoundDataType | null>(null);

  const teams: any[] = useMemo(() => {
    const currentRound = rounds[round - 1];
    return Object.values(
      currentRound.teams.reduce(
        (teams, team) => ({
          ...teams,
          [team.team_number]: {
            score:
              team.score -
              (currentRound.winner_team_number === team.team_number ? 1 : 0),
            team_number: team.team_number,
            players: players.children.filter(
              (player) => player.team === team.team_number
            ),
          },
        }),
        {}
      )
    );
  }, [currentTick, data]);

  const getPlayer = (steamid?: string): Player | null => {
    return (
      players.children.find((player) => player.steamid === steamid) || null
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsLoading(true);
      const signal = controller.signal;
      const response = await fetch(
        `/api/matches/${match.match_id}/2d/round/${round}`,
        {
          signal,
        }
      );
      const data = (await response.json()) as RoundDataType;
      setIsLoading(false);

      Object.keys(data.players).forEach((steamid: string) => {
        const playerData = data.players[steamid];
        const playerPositions = data.players_positions[steamid];
        if (playerPositions.end_tick > playerPositions.start_tick) {
          players.addChild(
            new Player({
              steamid,
              name: playerData.name,
              team_num: playerData.team,
              kills: playerData.kills,
              assists: playerData.assists,
              deaths: playerData.deaths,
              balance: playerData.balance,
              weapon: playerData.weapon,
              inventory: playerData.inventory || [],
              ticks: { ...playerPositions, dead: playerData.dead },
            })
          );
        }
      });

      const shacking: Array<{ start: number; end: number }> = [];
      data.grenades_positions.map((grenade) => {
        if (grenade.type === "he_grenade") {
          shacking.push({
            start: grenade.detonate_tick,
            end: grenade.end_tick + 15,
          });
        }

        objects.addChild(GrenadeFactory.create(grenade));
      });
      config.bomb_planted_tick = -1;
      const plant = data.events
        .filter((event) => {
          return [
            "bomb_exploded",
            "bomb_defused",
            "bomb_planted",
            "bomb_started_defusing",
            "bomb_aborted_defusing",
          ].includes(event.name);
        })
        .reduce(
          (object, event) => {
            const { attempts_defusing } = object;
            switch (event.name) {
              case "bomb_started_defusing":
                return {
                  ...object,
                  attempts_defusing: [
                    ...object.attempts_defusing,
                    {
                      start_tick: event.tick,
                      end_tick: event.tick,
                      steamid: event.data.steamid,
                      has_defuser: event.data.has_defuser,
                    },
                  ],
                };
              case "bomb_aborted_defusing":
                attempts_defusing[attempts_defusing.length - 1].end_tick =
                  event.tick;
                return {
                  ...object,
                  attempts_defusing,
                };
              case "bomb_planted":
                config.bomb_planted_tick = event.tick;
                return {
                  ...object,
                  planted: {
                    tick: event.tick,
                    x: event.data.x,
                    y: event.data.y,
                    steamid: event.data.steamid,
                  },
                };
              case "bomb_defused":
                attempts_defusing[attempts_defusing.length - 1].end_tick =
                  event.tick;
                return {
                  ...object,
                  attempts_defusing,
                  defused: {
                    tick: event.tick,
                    steamid: event.data.steamid,
                  },
                };
              case "bomb_exploded":
                shacking.push({ start: event.tick, end: event.tick + 50 });
                return {
                  ...object,
                  exploded: {
                    tick: event.tick,
                  },
                };
              default:
                return object;
            }
          },
          { attempts_defusing: [] } as any
        );

      objects.addChild(new C4(plant));

      setShacking(shacking);
      setData(data);
    };

    fetchData();

    return () => {
      players.removeChildren();
      objects.removeChildren();
      setCurrentTick(1);
      setData(null);
      controller.abort();
    };
  }, [round, match]);

  useEffect(() => {
    ReplayContainer.map = MAP_POSITION.find(
      (map) => map.name === match.map_name
    )!;

    const map = Sprite.from(
      `/assets/maps/radar/${ReplayContainer.map.name}.png`
    );
    map.width = width;
    map.height = height;
    viewport.x = app.screen.width / 2 - width / 2;
    viewport.y = app.screen.height / 2 - height / 2 + 50;

    viewport.wheel().drag().pinch();
    viewport.setZoom(0.7, true);
    viewport.addChild(map);
    viewport.addChild(bullets);
    viewport.addChild(players);
    viewport.addChild(objects);

    viewport.on("zoomed", (e) => {
      if (e.viewport.scaled >= 2) {
        e.viewport.setZoom(2);
      } else if (e.viewport.scaled <= 0.5) {
        e.viewport.setZoom(0.5);
      }
    });

    app.stage.addChild(viewport);
    ref.current?.appendChild(app.view);

    return () => {
      app.destroy();
    };
  }, []);

  useEffect(() => {
    const { start_tick = 0, events = [], grenades_positions = [] } = data || {};
    const replayTick = start_tick + currentTick - 1;
    const killsCurrentTick: any[] = [];

    bullets.removeChildren();

    players.children.forEach((player) => {
      player.update(replayTick);
      const playerData = data?.players[player.steamid];
      if (playerData) {
        player.hp = 100;
        player.kills = playerData.kills;
        player.assists = playerData.assists;
        player.deaths = playerData.deaths;
        player.balance = playerData.balance;
        player.inventory = playerData.inventory;
        player.blindEffect = {
          current: 0,
          duration: 0,
        };
      }
    });
    if (
      shacking.some(
        ({ start, end }) => replayTick >= start && replayTick <= end
      )
    ) {
      app.stage.position.set(
        Math.floor(Math.random() * 4),
        Math.floor(Math.random() * 4)
      );
    }

    objects.children.forEach((object) => {
      object.update(replayTick);
    });

    events.forEach((event) => {
      const player = players.children.find(
        (player) => player.steamid === event.data.steamid
      );
      switch (event.name) {
        case "weapon_fire":
          if (event.tick === replayTick) {
            if (player) {
              const bullet = player.fire();
              if (bullet) {
                bullets.addChild(bullet);
              }
            }
          }
          break;
        case "player_hurt":
          if (event.tick <= replayTick && player) {
            player.hp = event.data.hp;
          }
          if (event.tick === replayTick) {
            if (player) {
              player.hurt();
            }
          }
          break;
        case "new_balance":
          if (event.tick <= replayTick && player) {
            player.balance = event.data.value;
          }
          break;
        case "change_weapon":
          if (event.tick <= replayTick) {
            if (player) {
              player.changeWeapon(event.data.value);
            }
          }
          break;
        case "player_blind":
          if (event.tick <= replayTick) {
            if (player) {
              player.blindEffect = {
                current: Math.max(
                  0,
                  event.data.duration - (replayTick - event.tick) / 64
                ),
                duration: event.data.duration,
              };
            }
          }
          break;

        case "change_inventory":
          if (event.tick <= replayTick && player) {
            player.inventory = event.data.value || [];
          }
          break;
        case "player_death":
          if (event.tick <= replayTick) {
            const victim = getPlayer(event.data.user_steamid);
            const attacker = getPlayer(event.data.attacker_steamid);
            const assister = getPlayer(event.data.assister_steamid);

            if (attacker && victim && attacker.steamid !== victim.steamid) {
              attacker.kills += attacker.team === victim.team ? -1 : 1;
            }

            if (assister && victim && assister.team !== victim.team) {
              assister.assists += 1;
            }

            if (victim && attacker) {
              victim.deaths += 1;
            }
          }

          if (
            event.tick === replayTick ||
            (replayTick - event.tick > 0 && replayTick - event.tick < 200)
          ) {
            if (
              !killsCurrentTick.find(
                (kill) => event.data.user_steamid === kill.user_steamid
              )
            ) {
              killsCurrentTick.push({
                ...event.data,
                tick: event.tick,
                seconds: config.roundTime - currentTick / config.frameRate,
              });
            }
          }
          break;
      }

      setKills((kills) => {
        const oldKills = kills.filter(
          (kill) => kill.tick + 200 > replayTick && replayTick > kill.tick
        );

        return [
          ...oldKills,
          ...killsCurrentTick.filter(
            (kill) =>
              !oldKills.some(
                (oldKill) => oldKill.user_steamid === kill.user_steamid
              )
          ),
        ];
      });
    });
  }, [data, currentTick, shacking]);

  useEffect(() => {
    const intervarID = setInterval(() => {
      setCurrentTick((currentTick) => {
        if (
          !isPause &&
          data &&
          currentTick + data.start_tick <= data.end_tick
        ) {
          return currentTick + 1;
        }

        return currentTick;
      });
    }, 1000 / config.frameRate / speed);

    return () => {
      clearInterval(intervarID);
    };
  }, [data, isPause, speed]);

  const roundTimer = useMemo(() => {
    const replayTick = (data?.start_tick || 0) + currentTick - 1;

    let second = config.roundTime - currentTick / config.tickRate;
    if (
      config.bomb_planted_tick !== -1 &&
      replayTick >= config.bomb_planted_tick
    ) {
      const tick =
        currentTick - (config.bomb_planted_tick - (data?.start_tick || 0)) - 1;
      second = config.bombTime - tick / config.tickRate;
    }

    return seconds2timestring(Math.ceil(second >= 0 ? second : 0));
  }, [data, currentTick]);

  return (
    <>
      <div
        className="position-absolute top-0 bottom-0 end-0 start-0 z-0"
        ref={ref}
      />
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center bottom-0 end-0 position-absolute start-0  top-0">
          <div className="spinner-grow fs-1 text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {data && (
        <div
          className="d-flex justify-content-between position-absolute start-0 end-0"
          style={{
            height: 0,
            top: "50%",
            maxWidth: 1500,
            margin: "0 auto",
            padding: "0px 24px",
          }}
        >
          {teams.map((team, i) => (
            <div className="d-none d-lg-block" key={team.id}>
              <Team team={team} placement={i ? "right" : "left"} />
            </div>
          ))}
        </div>
      )}

      <div className="position-relative z-1">
        <div className="d-flex justify-content-center" style={{ height: 0 }}>
          <div className="d-inline-flex flex-column">
            <RaplayRounds rounds={rounds} onChange={setRound} current={round} />
            <div className="my-2 text-center">
              <span className="bg-body-secondary fs-5 px-2 py-1 rounded-3">
                {isLoading ? "Loading..." : roundTimer}
              </span>
            </div>
          </div>
        </div>

        <div className="end-0 top-0 mt-5 position-absolute">
          <Kills
            items={kills.map((kill) => {
              return {
                victim: getPlayer(kill.user_steamid)?.json,
                assister: getPlayer(kill.assister_steamid)?.json,
                attacker: getPlayer(kill.attacker_steamid)?.json,
                is_attacker_blind: kill.attackerblind,
                weapon: kill.weapon,
                is_headshot: Boolean(kill.headshot),
                is_noscope: Boolean(kill.noscope),
                is_penetrated: Boolean(kill.penetrated),
                is_thrusmoke: Boolean(kill.thrusmoke),
                seconds: kill.seconds,
              };
            })}
          />
        </div>
      </div>

      <div className="position-absolute bottom-0 m-5 d-flex justify-content-center start-0 end-0">
        {data && (
          <div
            className="w-100"
            style={{
              maxWidth: 1500,
              margin: "0 auto",
              padding: "0px 24px",
            }}
          >
            <ProgressBar
              isPause={isPause}
              onChangeSpeed={setSpeed}
              marks={data.events.reduce((marks, event) => {
                if (
                  ["player_death", "bomb_planted", "bomb_defused"].includes(
                    event.name
                  )
                ) {
                  const kill = event.data;
                  const attacker = getPlayer(kill.attacker_steamid);

                  return {
                    ...marks,
                    [event.tick - data.start_tick]: {
                      label: (
                        <>
                          {(() => {
                            if (event.name === "bomb_planted") {
                              return (
                                <div
                                  className="d-flex rounded-3 position-relative justify-content-center align-items-center fs-3"
                                  style={{
                                    width: 30,
                                    height: 30,
                                    background: "#f4183f",
                                    color: "#ffffff",
                                    marginTop: -13,
                                  }}
                                >
                                  <div
                                    className="bottom-0 position-absolute top-0"
                                    style={{
                                      width: 1,
                                      height: 40,
                                      background: "#f4183f",
                                      marginTop: -5,
                                    }}
                                  />
                                  <div className="position-relative z-1">
                                    {event.data.place}
                                  </div>
                                </div>
                              );
                            }
                            if (event.name === "bomb_defused") {
                              return (
                                <div
                                  className="d-flex rounded-3 position-relative justify-content-center align-items-center fs-3"
                                  style={{
                                    width: 30,
                                    height: 30,
                                    background: "#8AACDF",
                                    color: "#ffffff",
                                    marginTop: -13,
                                  }}
                                >
                                  <div
                                    className="bottom-0 position-absolute top-0"
                                    style={{
                                      width: 1,
                                      height: 40,
                                      background: "#8AACDF",
                                      marginTop: -5,
                                    }}
                                  />
                                  <div className="position-relative">
                                    <Weapon name="kit" size={18} />
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <Popover
                                event="hover"
                                placement="top"
                                trigger={
                                  <div
                                    style={{
                                      width: 1,
                                      height: 40,
                                      background: getColorByTeamNumber(
                                        attacker?.team || 0
                                      ),
                                      marginTop: -18,
                                    }}
                                  />
                                }
                              >
                                <Kills
                                  items={[
                                    {
                                      is_attacker_blind: kill.attackerblind,
                                      victim: getPlayer(kill.user_steamid)
                                        ?.json,
                                      assister: getPlayer(kill.assister_steamid)
                                        ?.json,
                                      attacker: getPlayer(kill.attacker_steamid)
                                        ?.json,
                                      weapon: kill.weapon,
                                      is_headshot: Boolean(kill.headshot),
                                      is_noscope: Boolean(kill.noscope),
                                      is_penetrated: Boolean(kill.penetrated),
                                      is_thrusmoke: Boolean(kill.thrusmoke),
                                      seconds:
                                        config.roundTime -
                                        (event.tick - data.start_tick) /
                                          config.frameRate,
                                    },
                                  ]}
                                />
                              </Popover>
                            );
                          })()}
                        </>
                      ),
                    },
                  };
                }

                return marks;
              }, {})}
              value={currentTick}
              max={data?.end_tick - data?.start_tick + 1}
              onChange={setCurrentTick}
              onPause={setIsPause}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Replay;
