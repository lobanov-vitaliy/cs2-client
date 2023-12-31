import { FC, useMemo, useState } from "react";
import Card from "@/app/components/Card";
import Table from "@/app/components/Table";
import { getColumns } from "./columns";
import classNames from "classnames";
import { useIntl } from "react-intl";
import { MatchRank } from "@/components/Rank";
import { useMatch } from "../../context";

type TeamTableProps = {
  loading?: boolean;
  team: {
    id: string;
    result: string;
    name: string;
    score: number;
    surrender: boolean;
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
      rounds_with_2_kills: number;
      rounds_with_3_kills: number;
      rounds_with_4_kills: number;
      rounds_with_5_kills: number;
      rank: number;
      rank_change: number;
      team_number: number;
      player_color: number;
      apr: number;
      kpr: number;
      dpr: number;
      adr: number;
      kd: number;
      kda: number;
      kdd: number;
      hs: number;
      sr: number;
      hltv_rating: number;
      kasts: number;
    }>;
  };
  sort: any;
  onSort: any;
};

const TeamTable: FC<TeamTableProps> = ({
  team,
  sort,
  onSort,
  loading = false,
}) => {
  const { $t } = useIntl();
  const match = useMatch();
  const columns = useMemo(() => getColumns($t, match), [$t, match]);
  return (
    <Card className="mb-lg-0 mb-2">
      <div className="d-flex">
        <div className="w-lg d-none d-lg-block">
          <div className="mb-0 h-100 d-flex align-items-center justify-content-center">
            <div className="d-flex gap-1 flex-column align-items-center justify-content-center">
              {team.surrender && <div className="text-danger">SURRENDERED</div>}

              {team.result === "win" ? (
                <div className="mdi mdi-trophy fs-1 d-flex justify-content-center align-items-center" />
              ) : (
                <div className="mdi mdi-account-group-outline fs-1 d-flex justify-content-center align-items-center" />
              )}

              <div className="fs-5">{team.name}</div>
              <MatchRank
                value={
                  +Number(
                    team.players.reduce(
                      (sum: number, player: any) => sum + player.rank,
                      0
                    ) / team.players.length
                  ).toFixed(0)
                }
              />
              <div
                className={classNames("fs-1", {
                  "text-success": team.result === "win",
                  "text-danger": team.result === "loss",
                })}
              >
                {team.score}
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 border-start">
          <Table
            columns={columns}
            data={team.players}
            sort={sort}
            onSort={onSort}
            loading={loading}
          />
        </div>
      </div>
    </Card>
  );
};

export default TeamTable;
