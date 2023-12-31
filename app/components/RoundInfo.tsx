import { FC, useState, useEffect, useMemo } from "react";
import { getColorByTeamNumber } from "@/app/utils/team";
import { seconds2timestring } from "@/app/utils/time";
import Weapon from "../(pages)/match/[id]/components/Weapon";
import { useIntl } from "react-intl";

const RoundInfo: FC<{ round: number; match: any }> = ({ round, match }) => {
  const { $t } = useIntl();
  const [timelines, setTimelines] = useState<any>(null);
  const players = useMemo(() => {
    return match.teams.reduce((players: any, team: any) => {
      return {
        ...players,
        ...team.players.reduce(
          (players: any, player: any) => ({
            ...players,
            [player.steamid]: player,
          }),
          {}
        ),
      };
    }, {});
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `/api/matches/${match.match_id}/round/${round}`
      ).then((response) => response.json());

      setTimelines(data);
    };

    fetchData();
  }, []);

  if (timelines === null) {
    return (
      <div className="align-items-center d-flex justify-content-center p-3">
        <div className="spinner-border spinner-grow-sm text-primary" />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-1">
      <div className="text-center">
        {$t({ id: "common.Round {round} started" }, { round })}
      </div>
      {timelines.map((timeline: any) => {
        if (timeline.event === "kill") {
          return (
            <div
              key={timeline.second}
              className="align-items-center d-flex gap-1"
            >
              <div className="text-center" style={{ width: 40 }}>
                {seconds2timestring(timeline.round_time)}
              </div>
              {timeline.data?.is_attacker_blind && (
                <div>
                  <img
                    height={16}
                    alt="shooter blind"
                    src={
                      "https://www.hltv.org/img/static/scoreboard/weapons/shooter_blind.png"
                    }
                  />
                </div>
              )}
              <div className="align-items-center d-flex gap-1">
                {timeline.data.attacker && (
                  <div
                    className="text-nowrap"
                    style={{
                      color: getColorByTeamNumber(
                        timeline.data.attacker.team_number
                      ),
                    }}
                  >
                    {players[timeline.data.attacker.steamid]?.name}
                  </div>
                )}
                {timeline.data.assister && (
                  <>
                    <i className="mdi mdi-plus" />
                    <div
                      className="text-nowrap"
                      style={{
                        color: getColorByTeamNumber(
                          timeline.data.assister.team_number
                        ),
                      }}
                    >
                      {players[timeline.data.assister.steamid]?.name}
                    </div>
                  </>
                )}
              </div>
              <div>
                {timeline.data.weapon === "world" ? (
                  <span>suicide</span>
                ) : timeline.data.weapon === "planted_c4" ? (
                  <svg
                    height={20}
                    fill="rgb(176, 158, 107)"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 581.5 532.9"
                  >
                    <polygon points="318.8,5 328,184.6 425.4,108.5 385.3,239 543.7,209 425.4,313.1 549.8,326.3 434.3,394.3 574.2,527.8   387.9,430.3 394.5,494.8 312.7,436.9 294.5,482.1 244.7,436.9 183.3,523.2 179.7,405 16.8,425.8 143.7,349.6 66.5,322.2   135.6,286.2 7.2,173.5 178.2,238.5 177.2,125.3 244.7,199.9 " />
                  </svg>
                ) : (
                  <Weapon name={timeline.data.weapon} size={20} />
                )}
              </div>
              {timeline.data?.is_noscope && (
                <div>
                  <img
                    height={16}
                    alt="noscope"
                    src={
                      "https://www.hltv.org/img/static/scoreboard/weapons/noscope.png"
                    }
                  />
                </div>
              )}
              {timeline.data?.is_thrusmoke && (
                <div>
                  <img
                    height={16}
                    alt="through smoke"
                    src={
                      "https://www.hltv.org/img/static/scoreboard/weapons/through_smoke.png"
                    }
                  />
                </div>
              )}
              {timeline.data?.is_penetrated && (
                <div>
                  <img
                    height={16}
                    alt="penetration"
                    src={
                      "https://www.hltv.org/img/static/scoreboard/weapons/penetration.png"
                    }
                  />
                </div>
              )}
              {timeline.data?.is_headshot && (
                <div>
                  <img
                    height={16}
                    alt="headshot"
                    src={
                      "https://www.hltv.org/img/static/scoreboard/weapons/headshot.png"
                    }
                  />
                </div>
              )}
              {timeline.data.weapon !== "world" && (
                <div
                  className="text-nowrap"
                  style={{
                    color: getColorByTeamNumber(
                      timeline.data.victim.team_number
                    ),
                  }}
                >
                  {players[timeline.data.victim.steamid]?.name}
                </div>
              )}
            </div>
          );
        }

        if (timeline.event === "bomb-planted") {
          return (
            <div
              key={timeline.event}
              className="align-items-center d-flex gap-1"
            >
              <div className="text-center" style={{ width: 40 }}>
                {seconds2timestring(timeline.round_time)}
              </div>
              <div
                className="text-nowrap"
                style={{
                  color: getColorByTeamNumber(2),
                }}
              >
                {players[timeline.data.steamid]?.name}
              </div>
              <img
                height={25}
                alt="bombplant"
                src="https://www.hltv.org/img/static/scoreboard/weapons/bombplant.png"
              />
              <span>
                {$t(
                  { id: "common.planted the bomb on {place} side" },
                  { place: timeline.data.place_name }
                )}
              </span>
            </div>
          );
        }

        if (timeline.event === "bomb-defused") {
          return (
            <div
              key={timeline.event}
              className="align-items-center d-flex gap-1"
            >
              <div className="text-center" style={{ width: 40 }}>
                {seconds2timestring(timeline.round_time)}
              </div>
              <div
                className="text-nowrap"
                style={{
                  color: getColorByTeamNumber(3),
                }}
              >
                {players[timeline.data.steamid]?.name}
              </div>
              <img
                height={25}
                alt="defusekit"
                src="https://www.hltv.org/img/static/scoreboard/weapons/defusekit.png"
              />
              <span>{$t({ id: "common.defused the bomb" })}</span>
            </div>
          );
        }
        if (timeline.event === "round-end") {
          return (
            <div key={timeline.event} className="text-center">
              {$t({ id: "common.Round {round} over - Winner" }, { round })}
              {": "}
              <span
                style={{
                  color: getColorByTeamNumber(timeline.data.winner),
                }}
              >
                {$t({
                  id:
                    timeline.data.winner === 2
                      ? "common.Terrorist"
                      : "common.Counter Terrorist",
                })}
              </span>
            </div>
          );
        }

        if (timeline.event === "bomb-exploded") {
          return (
            <div
              key={timeline.event}
              className="align-items-center d-flex gap-1"
            >
              <div className="text-center" style={{ width: 40 }}>
                {seconds2timestring(timeline.round_time)}
              </div>
              <span
                style={{
                  color: getColorByTeamNumber(2),
                }}
              >
                {$t({ id: "common.Target bombed" })}
              </span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default RoundInfo;
