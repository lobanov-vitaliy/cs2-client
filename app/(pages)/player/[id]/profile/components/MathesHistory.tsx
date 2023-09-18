import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import { getMapTitle } from "@/app/utils/match";

type MathesHistoryProps = {
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

const MathesHistory: FC<MathesHistoryProps> = ({ matches }) => {
  return (
    <Card>
      <div className="table-responsive">
        <table className="table table-nowrap table-striped align-middle caption-top table-borderless mb-0">
          <thead className="table-light">
            <tr>
              <th>Map</th>
              <th className="text-center">Date</th>
              <th className="text-center">Score</th>
              <th className="text-center">Rank</th>
              <th className="text-center">Kills</th>
              <th className="text-center">Deaths</th>
              <th className="text-center">K/D</th>
              <th className="text-center">HS%</th>
              <th className="text-center" style={{ width: 60 }}>
                Source
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.match_id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <Image
                      width={24}
                      height={24}
                      src={`/assets/maps/map_icon_${match.map_name}.svg`}
                      alt={match.map_name}
                    />
                    {getMapTitle(match.map_name)}
                  </div>
                </td>
                <td className="text-center">
                  {format(new Date(match.datetime), "yyyy-MM-dd")}
                </td>
                <td
                  className={classNames("text-center", {
                    "text-success": match.result === "win",
                    "text-danger": match.result === "loss",
                  })}
                >
                  {match.scores.join(":")}
                </td>
                <td className="text-center">{match.rank}</td>
                <td className="text-center">{match.kills}</td>
                <td className="text-center">{match.deaths}</td>
                <td
                  className={classNames("text-center", {
                    "text-success": match.kd >= 1,
                    "text-danger": match.kd < 1,
                  })}
                >
                  {Number(match.kd).toFixed(2)}%
                </td>
                <td
                  className={classNames("text-center", {
                    "text-success": match.hs > 50,
                    "text-danger": match.hs < 50,
                  })}
                >{`${match.hs.toFixed(1)}%`}</td>
                <td className="text-center">
                  <i className="mdi mdi-cloud-upload fs-4"></i>
                </td>
                <td className="text-center" style={{ width: 60 }}>
                  <Link
                    className="link-primary"
                    href={`/match/${match.match_id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default MathesHistory;
