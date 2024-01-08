"use client";

import { FC, useState, useMemo } from "react";
import { getColorByTeamNumber } from "@/app/utils/team";
import Reason from "../Reason";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import { useMatch } from "../../context";
import { sum } from "@/app/utils/number";
import { useIntl } from "react-intl";

type EconomyProps = {
  rounds: Array<{
    round_number: number;
    winner_team_number: number;
    reason: number;
    teams: Array<{
      id: string;
      team_number: number;
      count: number;
      survived: number;
    }>;
  }>;
  economy: Array<{
    round_number: number;
    teams: Array<{
      id: string;
      players: Array<{
        steamid: string;
        cash_spent: number;
        start_balance: number;
        equip_value: number;
      }>;
      cash_spent: number;
      start_balance: number;
      equip_value: number;
    }>;
  }>;
};

const types = [
  {
    title: "Pistol",
    name: "pistol",
    color: "rgba(92, 104, 152, 0.7)",
    min: Infinity,
    max: Infinity,
  },
  {
    title: "Full eco",
    name: "full-eco",
    color: "rgba(237, 94, 94, 0.7)",
    min: 0,
    max: 5000,
  },
  {
    title: "Semi-eco",
    name: "semi-eco",
    color: "rgba(232, 188, 82, 0.7)",
    min: 5000,
    max: 10000,
  },
  {
    title: "Semi-buy",
    name: "semi-buy",
    color: "rgba(80, 195, 230, 0.7)",
    min: 10000,
    max: 20000,
  },
  {
    title: "Full buy",
    name: "full-buy",
    color: "rgba(19, 197, 107, 0.7)",
    min: 20000,
    max: Infinity,
  },
];

const getBuyTypeByTeam = (team: any) => {
  return types.find((data) => {
    if (data.name === "pistol") {
      return team.players.length * 800 === team.start_balance;
    }

    const min = (data.min / 5) * team.players.length;
    const max = (data.max / 5) * team.players.length;
    return team.equip_value > min && team.equip_value <= max;
  });
};

const Economy: FC<EconomyProps> = ({ rounds, economy }) => {
  const { $t } = useIntl();
  const isPistolRound = (number: number) => {
    if (number === 1) {
      return true;
    }
    const round = rounds.find((round) => round.round_number === number);
    const roundIndex = rounds.findIndex(
      (round) => round.round_number === number
    );
    return (
      rounds[roundIndex - 1] &&
      round?.teams[0].team_number !==
        rounds[roundIndex - 1].teams[0].team_number
    );
  };

  const match = useMatch();
  const [ids, setIds] = useState<string[]>(
    match.players.map((player: any) => player.steamid)
  );
  const data = useMemo(() => {
    return economy.map((economy) => ({
      ...economy,
      teams: economy.teams.map((team) => {
        const players = team.players.filter((player) =>
          ids.includes(player.steamid)
        );
        return {
          ...team,
          players,
          start_balance: sum(players.map((player) => player.start_balance)),
          cash_spent: sum(players.map((player) => player.cash_spent)),
          equip_value: sum(players.map((player) => player.equip_value)),
        };
      }),
    }));
  }, [ids, economy]);

  const playersEconomy = useMemo(() => {
    return match.players.map((player: any) => ({
      steamid: player.steamid,
      economy: data.reduce((economy: any, round) => {
        const playerTeam = round.teams.find((team) =>
          team.players.find(({ steamid }) => steamid === player.steamid)
        );
        if (playerTeam) {
          const playerEconomy = playerTeam.players.find(
            ({ steamid }) => steamid === player.steamid
          );

          if (playerEconomy) {
            types.forEach((type) => {
              const min = type.min / 5;
              const max = type.max / 5;
              if (type.name === "pistol" && isPistolRound(round.round_number)) {
                economy["pistol"] = (economy["pistol"] || 0) + 1;
              } else if (
                !isPistolRound(round.round_number) &&
                playerEconomy.equip_value > min &&
                playerEconomy.equip_value <= max
              ) {
                economy[type.name] = (economy[type.name] || 0) + 1;
              }
            });
          }
        }

        return economy;
      }, {}),
    }));
  }, [match, data]);

  const teamsEconomy = useMemo(() => {
    return match.teams.map((team: any) => ({
      id: team.id,
      economy: data.reduce((economy: any, round) => {
        const teamEconomy = round.teams.find(({ id }) => id === team.id);
        if (teamEconomy && teamEconomy.players.length > 0) {
          types.some((type) => {
            const min = (type.min / 5) * teamEconomy.players.length;
            const max = (type.max / 5) * teamEconomy.players.length;
            if (
              (type.name === "pistol" && isPistolRound(round.round_number)) ||
              (teamEconomy.equip_value > min && teamEconomy.equip_value <= max)
            ) {
              if (typeof economy[type.name] === "undefined") {
                economy[type.name] = {
                  played: 0,
                  wins: 0,
                };
              }

              economy[type.name].played += 1;
              const _round = rounds.find(
                ({ round_number }) => round.round_number === round_number
              );
              economy[type.name].wins +=
                _round?.winner_team_number ===
                _round?.teams.find(({ id }) => id === team.id)?.team_number
                  ? 1
                  : 0;
              return true;
            }

            return false;
          });
        }

        return economy;
      }, {}),
    }));
  }, [data, playersEconomy]);

  const maxEquipmentValue = useMemo(() => {
    return (
      Math.max(
        ...data.reduce(
          (values: any, current: any) => [
            ...values,
            current.teams[0].equip_value,
            current.teams[1].equip_value,
          ],
          []
        )
      ) + 100
    );
  }, [data]);

  return (
    <div className="mt-4">
      <div className="row">
        {match.teams.map((team: any, i: number) => {
          const teamEconomy = teamsEconomy.find(
            (teamEconomy: any) => teamEconomy.id === team.id
          );
          return (
            <div key={team.id} className="col-12 col-lg-6">
              <Card>
                <Card.Header className="p-1">
                  <div className="align-items-end d-flex text-nowrap w-100">
                    {Object.values(teamEconomy.economy).length > 0 ? (
                      types.map((type) => {
                        const max =
                          sum(
                            Object.values(teamEconomy.economy).map(
                              (d: any) => d.played
                            )
                          ) || 0;
                        const per =
                          ((teamEconomy.economy[type.name]?.played || 0) /
                            max) *
                          100;

                        return (
                          <div
                            key={type.name}
                            className="text-center"
                            style={{
                              width: `${per}%`,
                              color: type.color,
                              transition: "width 0.2s",
                            }}
                          >
                            {per > 0 && <div>{per.toFixed(0)}%</div>}
                            <div
                              className="w-100"
                              style={{
                                height: 10,
                                background: type.color,
                              }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center w-100">
                        <div>-</div>
                        <div
                          className="w-100 bg-dark"
                          style={{
                            height: 10,
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Card.Header>
                <div className="table-responsive">
                  <table className="table table-hover table-nowrap table-sm align-middle table-striped caption-top table-borderless mb-0">
                    <thead className="table-light align-middle">
                      <tr
                        className="cursor-pointer"
                        onClick={() => {
                          const playersIds = team.players.map(
                            (player: any) => player.steamid
                          );
                          const checked = playersIds.every((id: string) =>
                            ids.includes(id)
                          );
                          if (checked) {
                            setIds(
                              ids.filter((id) => !playersIds.includes(id))
                            );
                          } else {
                            setIds([...ids, ...playersIds]);
                          }
                        }}
                      >
                        <th>
                          <span>
                            {team.name ||
                              $t({ id: "common.Team" }) + " " + (i ? "B" : "A")}
                          </span>
                        </th>
                        {types.map((type) => (
                          <th
                            key={type.name}
                            className="text-center"
                            style={{ width: 100 }}
                          >
                            <div style={{ color: type.color }}>
                              {$t({ id: `common.${type.title}` })}
                            </div>
                            <div className="text-muted">
                              {`(${teamEconomy.economy[type.name]?.wins || 0}/${
                                teamEconomy.economy[type.name]?.played || 0
                              })`}
                            </div>
                          </th>
                        ))}
                        <th style={{ width: 30 }}>
                          <div className="form-check form-check-outline form-check-primary px-1">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={team.players.every((player: any) =>
                                ids.includes(player.steamid)
                              )}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {team.players.map((player: any) => {
                        const playerEconomy = playersEconomy.find(
                          ({ steamid }: any) => steamid === player.steamid
                        );
                        return (
                          <tr
                            key={player.steamid}
                            className="cursor-pointer"
                            onClick={() => {
                              if (ids.includes(player.steamid)) {
                                setIds(
                                  ids.filter((id) => id !== player.steamid)
                                );
                              } else {
                                setIds([...ids, player.steamid]);
                              }
                            }}
                          >
                            <td>
                              <div className="d-flex align-items-center gap-2">
                                <Avatar src={player.avatar} size="xxs" />
                                <h5 className="fs-13 mb-0 d-none d-md-block">
                                  {player.name}
                                </h5>
                              </div>
                            </td>
                            {types.map((type) => {
                              return (
                                <td key={type.name} className="text-center">
                                  {playerEconomy.economy[type.name] || "-"}
                                </td>
                              );
                            })}
                            <td style={{ width: 30 }} className="text-center">
                              <div className="align-items-center d-flex form-check form-check-outline form-check-primary justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={ids.includes(player.steamid)}
                                />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <Card>
        <div className="d-flex flex-column justify-content-center gap-2 p-3">
          {rounds.map((round, i: number) => {
            const isSwapRound =
              rounds[i + 1] &&
              round.teams[0].team_number !== rounds[i + 1].teams[0].team_number;

            const roundEconomyTeams = round.teams.map((team) => {
              return data
                .find((economy) => economy.round_number === round.round_number)
                ?.teams.find(({ id }) => id === team.id);
            });

            return (
              <>
                <div
                  className="d-flex justify-content-center align-items-center gap-1"
                  key={round.round_number}
                >
                  <div className="position-relative w-100 text-end bg-body-tertiary">
                    <div
                      style={{
                        background: getBuyTypeByTeam(roundEconomyTeams[0])
                          ?.color,
                        width: `${
                          ((roundEconomyTeams[0]?.equip_value || 0) /
                            maxEquipmentValue) *
                          100
                        }%`,
                        transition: "width 0.2s",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                      }}
                    />
                    <span
                      className="position-relative"
                      style={{ zIndex: 1, padding: 5, color: "#fff" }}
                    >
                      ${roundEconomyTeams[0]?.equip_value}
                    </span>
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-1">
                    <Reason
                      reason={round.reason}
                      winner={round.winner_team_number}
                      team={round.teams[0]}
                    />
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        paddingTop: 1,
                        paddingRight: 2,
                        border: `1px solid ${getColorByTeamNumber(
                          round.winner_team_number
                        )}`,
                      }}
                      className="d-flex fs-5 rounded-1 justify-content-center align-items-center bg-opacity-25"
                    >
                      {round.round_number}
                    </div>
                    <Reason
                      reason={round.reason}
                      winner={round.winner_team_number}
                      team={round.teams[1]}
                    />
                  </div>
                  <div className="position-relative w-100 bg-body-tertiary">
                    <div
                      style={{
                        background: getBuyTypeByTeam(roundEconomyTeams[1])
                          ?.color,
                        width: `${
                          ((roundEconomyTeams[1]?.equip_value || 0) /
                            maxEquipmentValue) *
                          100
                        }%`,
                        transition: "width 0.2s",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                      }}
                    />
                    <span
                      className="position-relative"
                      style={{ zIndex: 1, padding: 5, color: "#fff" }}
                    >
                      ${roundEconomyTeams[1]?.equip_value}
                    </span>
                  </div>
                </div>
                {isSwapRound && (
                  <div className="mdi mdi-reload fs-5 d-flex justify-content-center align-items-center" />
                )}

                {i === rounds.length - 1 && (
                  <div className="mdi mdi-trophy fs-5 d-flex justify-content-center align-items-center" />
                )}
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Economy;
