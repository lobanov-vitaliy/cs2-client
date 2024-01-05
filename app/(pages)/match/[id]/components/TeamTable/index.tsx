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
              {team.surrender && (
                <div className="text-danger text-uppercase">
                  {$t({ id: "common.Surrendered" })}
                </div>
              )}

              {team.result === "win" ? (
                <div className="mdi mdi-trophy fs-1 d-flex justify-content-center align-items-center" />
              ) : team.surrender ? (
                <svg width={33} viewBox="0 0 32 32">
                  <symbol id="dude-transit" viewBox="0 -25.1 21.25 25.118">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      fill="currentColor"
                      d="M15.5-4.2l0.75-1.05l1-3.1l3.9-2.65v-0.05   c0.067-0.1,0.1-0.233,0.1-0.4c0-0.2-0.05-0.383-0.15-0.55c-0.167-0.233-0.383-0.35-0.65-0.35l-4.3,1.8l-1.2,1.65l-1.5-3.95   l2.25-5.05l-3.25-6.9c-0.267-0.2-0.633-0.3-1.1-0.3c-0.3,0-0.55,0.15-0.75,0.45c-0.1,0.133-0.15,0.25-0.15,0.35   c0,0.067,0.017,0.15,0.05,0.25c0.033,0.1,0.067,0.184,0.1,0.25l2.55,5.6L10.7-14l-3.05-4.9L0.8-18.7   c-0.367,0.033-0.6,0.184-0.7,0.45c-0.067,0.3-0.1,0.467-0.1,0.5c0,0.5,0.2,0.767,0.6,0.8l5.7,0.15l2.15,5.4l3.1,5.65L9.4-5.6   c-1.367-2-2.1-3.033-2.2-3.1C7.1-8.8,6.95-8.85,6.75-8.85C6.35-8.85,6.1-8.667,6-8.3C5.9-8,5.9-7.8,6-7.7H5.95l2.5,4.4l3.7,0.3   L14-3.5L15.5-4.2z M14.55-2.9c-0.333,0.4-0.45,0.85-0.35,1.35c0.033,0.5,0.25,0.9,0.65,1.2S15.7,0.066,16.2,0   c0.5-0.067,0.9-0.3,1.2-0.7c0.333-0.4,0.467-0.85,0.4-1.35c-0.066-0.5-0.3-0.9-0.7-1.2c-0.4-0.333-0.85-0.45-1.35-0.35   C15.25-3.533,14.85-3.3,14.55-2.9z"
                    />
                  </symbol>
                  <g>
                    <circle
                      fill="currentColor"
                      cx="10.51"
                      cy="15.297"
                      r="5.348"
                    />
                    <path
                      fill="currentColor"
                      d="M27.609,2.439c0,0-0.298,0.289-0.69,1.137c-0.392,0.849-2.003,1.238-2.861,1.287   c-0.858,0.05-1.694,0.294-2.351,0.673c-0.492,0.287-1.15,0.877-1.446,1.153l-0.313-0.517l-0.686,0.417l9.862,15.782l0.685-0.416   l-6.39-10.059c0.159-0.14,0.425-0.378,0.852-0.774c0.844-0.786,1.929-0.887,2.947-0.983c1.021-0.096,1.942-0.525,2.618-1.017   c0.674-0.491,1.237-1.454,1.237-1.454L27.609,2.439z"
                    />
                    <path
                      fill="currentColor"
                      d="M28.835,17.144c-0.977-0.531-2.198-0.168-2.728,0.809l-3,5.821l-5.045,0.644   c-2.585-1.625-5.292-2.046-7.482-2.046c-5.008,0-9.102,2.086-9.477,4.732H1.066v3.549h19.025v-2.11l3.781-0.702   c0.502,0.021,0.965-0.154,1.329-0.445c0.413-0.17,0.774-0.469,1.004-0.892l3.438-6.631C30.175,18.896,29.813,17.674,28.835,17.144z   "
                    />
                  </g>
                </svg>
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
