"use client";

import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import { getMapTitle } from "@/app/utils/match";
import { useIntl } from "react-intl";
import Popover from "@/components/Popover";
import Link from "next/link";
import { format } from "date-fns";

type ClutchesProps = {
  clutches: Array<{
    wins: number;
    attempts: number;
    vs: number;
    matches: Array<{
      match_id: string;
      map_name: string;
      datetime: string;
      round: number;
      win: boolean;
    }>;
  }>;
};

const Clutches: FC<ClutchesProps> = ({ clutches }) => {
  const { $t } = useIntl();

  return (
    <div className="row row-cols-lg-5">
      {[...new Array(5)]
        .map(
          (_, i: number) =>
            clutches.find((clutch) => clutch.vs === i + 1) || {
              wins: 0,
              attempts: 0,
              vs: i + 1,
              matches: [],
            }
        )
        .map((clutch) => {
          const winrate = clutch.attempts
            ? +Number((clutch.wins / clutch.attempts) * 100).toFixed(0)
            : 0;
          return (
            <div key={clutch.vs}>
              <Card>
                <div className="d-flex flex-column gap-1 align-items-center p-3">
                  <div className="fs-1 border border-2 p-3 rounded-circle">
                    1v{clutch.vs}
                  </div>
                  <div className="fs-6 text-muted">
                    {$t({ id: "common.Clutches won" })}
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="fs-2">
                      {clutch.wins}/{clutch.attempts}
                    </span>
                    <span
                      className={classNames("fs-5", {
                        "text-success": winrate > 50,
                        "text-danger": winrate < 50,
                      })}
                    >{`(${winrate}%)`}</span>
                  </div>
                  <Popover
                    event="click"
                    width="trigger"
                    placement="bottom"
                    trigger={({ isOpen }) => {
                      return (
                        <div className="cursor-pointer gap-1 align-items-center d-flex">
                          {$t({
                            id: "common.Clutches",
                          })}
                          {isOpen ? (
                            <i className="mdi mdi-chevron-up" />
                          ) : (
                            <i className="mdi mdi-chevron-down" />
                          )}
                        </div>
                      );
                    }}
                  >
                    {({ close }) => {
                      return (
                        <div
                          style={{ maxHeight: 300, overflow: "auto" }}
                          className="d-inline-block dropdown-menu position-relative w-100"
                        >
                          <>
                            {clutch.matches.length === 0 && (
                              <div className="p-1 text-center">No clutches</div>
                            )}

                            {clutch.matches
                              .sort((a, b) => Number(b.win) - Number(a.win))
                              .map((match) => (
                                <Link
                                  key={`${match.match_id}:${match.round}`}
                                  className="dropdown-item"
                                  href={`/match/${match.match_id}/clutches`}
                                  onClick={() => {
                                    close();
                                  }}
                                >
                                  <div className="align-items-center d-flex gap-3 justify-content-between">
                                    <div>
                                      <div>{`${getMapTitle(
                                        match.map_name
                                      )} ${$t({
                                        id: "common.Round",
                                      })} #${match.round}`}</div>
                                      <div>
                                        {format(
                                          new Date(match.datetime),
                                          "yyyy-MM-dd HH:mm"
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className={classNames("text-center", {
                                        "text-success": match.win,
                                        "text-danger": !match.win,
                                      })}
                                    >
                                      {match.win ? "W" : "L"}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                          </>
                        </div>
                      );
                    }}
                  </Popover>
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default Clutches;
