"use client";

import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import SideSwicher from "@/app/components/SideSwicher";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import classNames from "classnames";
import { FC, useState } from "react";
import { useMatch } from "../context";

const Сlutches: FC<{ clutches: any[] }> = ({ clutches }) => {
  const match = useMatch();
  const [side, setSide] = useState(0);

  return (
    <>
      <div>
        <SideSwicher value={side} onChange={setSide} />

        <div className="row">
          {match.teams.map((team: any, i: number) => (
            <div key={team.id} className="col-12 col-lg-6">
              <Card className="card-height-100">
                <Card.Header className="p-2 pb-0">
                  <div className={`row row-cols-${team.players.length}`}>
                    {team.players.map((player: any) => (
                      <div
                        key={player.steamid}
                        className="col d-flex flex-column gap-2 align-items-center text-center"
                      >
                        <Avatar
                          src={player.avatar}
                          size="sm"
                          style={{
                            border: `2px solid ${
                              TEAM_PLAYER_COLOR[player.player_color]
                            }`,
                          }}
                        />
                        <span className="text-truncate">{player.name}</span>
                      </div>
                    ))}
                  </div>
                </Card.Header>
                <Card.Body className="p-2">
                  <div className={`row h-100 row-cols-${team.players.length}`}>
                    {team.players.map((player: any) => {
                      const playerClutches = clutches?.filter(
                        (clutch) =>
                          clutch.steamid === player.steamid &&
                          (side === 0 || side === clutch.team_number)
                      );

                      return (
                        <div
                          key={player.steamid}
                          className={classNames(
                            "col d-flex flex-column flex-grow-1 gap-2 align-items-center text-center"
                          )}
                        >
                          {playerClutches?.map((clutch) => {
                            let result;
                            if (clutch.win) {
                              result = "won";
                            } else if (clutch.survived) {
                              result = "saved";
                            } else {
                              result = "lost";
                            }
                            return (
                              <div
                                key={clutch.steamid}
                                className={classNames(
                                  "border w-xs rounded-1 bg-opacity-10",
                                  {
                                    "border-success bg-success":
                                      result === "won",
                                    "border-danger bg-danger":
                                      result === "lost",
                                    "border-warning bg-warning":
                                      result === "saved",
                                  }
                                )}
                              >
                                <div>
                                  <div
                                    className={classNames(
                                      "border-bottom border-success text-center fs-5",
                                      {
                                        "border-success": result === "won",
                                        "border-danger": result === "lost",
                                        "border-warning": result === "saved",
                                      }
                                    )}
                                  >
                                    1v{clutch.length}
                                  </div>
                                </div>
                                <div className="p-0 d-flex flex-column align-items-center">
                                  <div className="p-0 d-flex gap-1 align-items-center">
                                    <svg
                                      width={16}
                                      height={16}
                                      fill="currentColor"
                                    >
                                      <path d="M1.095 9.2C1.272 9.168-.21.085 7.69.003V0h.621v.002c7.9.082 6.417 9.165 6.594 9.199.177.033 1.084.552.243 1.161-.697.504-.558 1.071-1.012 1.917-.453.845-1.419.288-2.366.608-.946.322-.236 1.458-.808 2.253-.547.761-2.772.868-2.962.86-.19.008-2.415-.099-2.962-.86-.572-.795.138-1.931-.808-2.253-.947-.32-1.913.237-2.366-.608-.454-.846-.315-1.412-1.012-1.917-.84-.609.066-1.128.243-1.161zm7.729.305c.218 1.39 2.983.857 3.522.474.583-.416.583-2.39-.315-2.526-.897-.135-3.342 1.195-3.207 2.052zm-.97 3.157c.076-.083.12-.21.146-.35.026.14.07.267.145.35.163.178.662-.057.673-.778.012-.722-.816-1.477-.816-1.477s-.831.755-.82 1.477c.01.721.51.956.673.778zm-4.34-2.683c.538.383 3.304.916 3.522-.474.135-.857-2.31-2.187-3.208-2.052-.897.135-.897 2.11-.314 2.526z" />
                                    </svg>
                                    <span className="fs-5">
                                      {clutch.kills.length}
                                    </span>
                                  </div>
                                  <div>Round {clutch.round_number}</div>
                                </div>
                                <div
                                  className={classNames(
                                    "border-top border-success text-center fs-6",
                                    {
                                      "text-success border-success":
                                        result === "won",
                                      "text-danger border-danger":
                                        result === "lost",
                                      "text-warning border-warning":
                                        result === "saved",
                                    }
                                  )}
                                >
                                  {result.toUpperCase()}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Сlutches;
