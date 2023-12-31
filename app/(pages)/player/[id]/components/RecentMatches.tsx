import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Image from "next/image";
import { format } from "date-fns";
import { getMapTitle } from "@/app/utils/match";
import Link from "next/link";
import getIntl from "@/components/providers/ServerIntlProvider/intl";
import { MATCH_MODE } from "@/app/consts";

type RecentMatchesProps = {
  matches: Array<{
    match_id: string;
    map_name: string;
    datetime: string;
    data_source: string;
    kills: number;
    headshots: number;
    damage: number;
    utility_damage: number;
    assists: number;
    deaths: number;
    rank: number;
    rank_change: number;
    comp_wins: number;
    comp_rank_type: number;
    score: number;
    mvps: number;
    player_color: number;
    ping: number;
    result: "win" | "loss" | "tie";
    kd: number;
    kda: number;
    kdd: number;
    hs: number;
    scores: number[];
  }>;
};

const RecentMatches: FC<RecentMatchesProps> = async ({ matches }) => {
  const { $t } = await getIntl();
  return (
    <div className="row">
      {matches.map((match: any) => {
        let title = $t({ id: "common.Draw" });
        if (match.result === "win") {
          title = $t({ id: "common.Victory" });
        } else if (match.result === "loss") {
          title = $t({ id: "common.Defeat" });
        }
        return (
          <Link
            key={match.match_id}
            href={`/match/${match.match_id}`}
            className="col-lg-4 col-md-12"
          >
            <Card animate>
              <Card.Header className="d-flex justify-content-between">
                <span>
                  {format(new Date(match.datetime), "yyyy-MM-dd HH:mm")}
                </span>
              </Card.Header>
              <Card.Body
                style={{
                  background: `url(/assets/maps/screenshots/720p/${match.map_name}_png.png)`,
                  backgroundPosition: "center center",
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <Image
                    width={100}
                    height={100}
                    src={`/assets/maps/map_icon_${match.map_name}.svg`}
                    alt={match.map_name}
                  />
                  <div className="align-items-baseline d-flex flex-column gap-1">
                    <div className="fs-3 bg-dark rounded-2 d-flex gap-2 p-2">
                      <span className="text-uppercase">{title}</span>
                      <span
                        className={classNames({
                          "text-success": match.result === "win",
                          "text-danger": match.result === "loss",
                        })}
                      >
                        {match.scores.join(":")}
                      </span>
                    </div>
                    <span className="fs-5 bg-dark rounded-2 p-2">
                      {getMapTitle(match.map_name)}
                    </span>
                  </div>
                </div>
              </Card.Body>

              <Card.Footer>
                <div className="align-items-center justify-content-between fs-5 d-flex gap-1">
                  <span className="text-center">
                    {$t({ id: "common.KDA" })}:{" "}
                    {[match.kills, match.deaths, match.assists].join("/")}
                  </span>
                  <span className="text-center">
                    {$t({ id: "common.K/D" })}:{" "}
                    <span
                      className={classNames({
                        "text-success": match.kd >= 1,
                        "text-danger": match.kd < 1,
                      })}
                    >{`${match.kd.toFixed(2)}`}</span>
                  </span>
                  <span className="text-center">
                    {$t({ id: "common.HS" })}: {`${match.hs.toFixed(1)}%`}
                  </span>
                </div>
              </Card.Footer>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default RecentMatches;
