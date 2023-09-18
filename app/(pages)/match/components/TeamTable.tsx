import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Avatar from "@/app/components/Avatar";
import Link from "next/link";

type TeamTableProps = {
  team: {
    id: string;
    result: string;
    name: string;
    players: Array<{
      steamid: string;
      avatar: string;
      name: string;
      kills: number;
      assists: number;
      damage: number;
      headshots: number;
      utility_damage: number;
      played_rounds: number;
      deaths: number;
      survived_rounds: number;
      rounds_with_3_kills: number;
      rounds_with_4_kills: number;
      rounds_with_5_kills: number;
      team_number: number;
      apr: number;
      kpr: number;
      dpr: number;
      adr: number;
      kd: number;
      kda: number;
      kdd: number;
      hs: number;
      sr: number;
    }>;
  };
};

const TeamTable: FC<TeamTableProps> = ({ team }) => {
  return (
    <Card>
      <div className="table-responsive">
        <table className="table table-nowrap align-middle table-striped caption-top table-borderless mb-0">
          <thead className="table-light">
            <tr>
              <th>
                <span>{team.name}</span>
              </th>
              <th style={{ width: 80 }} className="text-center">
                Rank
              </th>
              <th style={{ width: 80 }} className="text-center">
                Kills
              </th>
              <th style={{ width: 80 }} className="text-center">
                Deaths
              </th>
              <th style={{ width: 80 }} className="text-center">
                Assists
              </th>
              <th style={{ width: 80 }} className="text-center">
                K / D
              </th>
              <th style={{ width: 80 }} className="text-center">
                HS%
              </th>
              <th style={{ width: 80 }} className="text-center">
                UD
              </th>
              <th style={{ width: 80 }} className="text-center">
                3K
              </th>
              <th style={{ width: 80 }} className="text-center">
                4K
              </th>
              <th style={{ width: 80 }} className="text-center">
                5K
              </th>
              <th style={{ width: 80 }} className="text-center">
                Rounds Survived
              </th>
              <th style={{ width: 80 }} className="text-center">
                Damage
              </th>
            </tr>
          </thead>
          <tbody>
            {team.players.map((player) => {
              return (
                <tr key={player.steamid}>
                  <td
                    className={classNames("border-start", {
                      "border-danger": team.result === "loss",
                      "border-success": team.result === "win",
                    })}
                  >
                    <Link
                      href={`/player/${player.steamid}/profile`}
                      className="d-flex align-items-center d-flex justify-content-center  justify-content-md-start gap-2"
                    >
                      <Avatar src={player.avatar} size="xxs" />
                      <h5 className="fs-13 mb-0 d-none d-md-block">
                        {player.name}
                      </h5>
                    </Link>
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {0}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.kills}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.deaths}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.assists}
                  </td>
                  <td
                    style={{ width: 80 }}
                    className={classNames("text-center", {
                      "text-success": player.kd >= 1,
                      "text-danger": player.kd < 1,
                    })}
                  >
                    {Number(player.kd).toFixed(2)}%
                  </td>
                  <td
                    style={{ width: 80 }}
                    className="text-center"
                  >{`${player.hs?.toFixed(1)}%`}</td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.utility_damage}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.rounds_with_3_kills}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.rounds_with_4_kills}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.rounds_with_5_kills}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.survived_rounds}
                  </td>
                  <td style={{ width: 80 }} className="text-center">
                    {player.damage}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default TeamTable;
