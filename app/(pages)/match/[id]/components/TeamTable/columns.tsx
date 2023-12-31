import Avatar from "@/app/components/Avatar";
import { TypeColumn } from "@/app/components/Table";
import { MATCH_MODE, TEAM_PLAYER_COLOR } from "@/app/consts";
import LogoIcon from "@/components/LogoIcon";
import Popover from "@/components/Popover";
import { MatchRank } from "@/components/Rank";
import classNames from "classnames";
import Link from "next/link";

export const getColumns = ($t: any, match: any): TypeColumn[] => [
  {
    id: "ping",
    options: {
      align: "center",
      width: 40,
    },
    Header: <i className="mdi mdi-signal" />,
    Cell: (row: any) => row.ping,
  },
  {
    id: "name",
    options: {
      loading: false,
    },
    Header: "",
    Cell: (row: any) => (
      <Link
        href={`/player/${row.steamid}`}
        className="d-flex align-items-center d-flex justify-content-center  justify-content-md-start gap-2"
      >
        <Avatar
          src={row.avatar}
          size="xs"
          style={{
            border: `2px solid ${TEAM_PLAYER_COLOR[row.player_color]}`,
          }}
        />
        <MatchRank value={row.rank} />
        {match.match_making_mode === MATCH_MODE.Premier && (
          <div
            style={{ width: 40 }}
            className={classNames("text-center", {
              "text-success": row.rank_change > 0,
              "text-danger": row.rank_change < 0,
            })}
          >
            {row.rank_change !== 0 && (
              <>
                {row.rank_change > 0 ? `+${row.rank_change}` : row.rank_change}
              </>
            )}
          </div>
        )}
        <h5 className="fs-13 mb-0 d-none d-md-block">{row.name}</h5>
        {row.userid && (
          <Popover
            placement="bottom"
            event="hover"
            className="popover p-2"
            trigger={<LogoIcon size={16} />}
          >
            Hardscore User
          </Popover>
        )}
      </Link>
    ),
  },

  {
    id: "kills",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: $t({ id: "common.Kills" }),
    Cell: (row: any) => row.kills,
  },
  {
    id: "deaths",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: $t({ id: "common.Deaths" }),
    Cell: (row: any) => row.deaths,
  },
  {
    id: "assists",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: $t({ id: "common.Assists" }),
    Cell: (row: any) => row.assists,
  },
  {
    id: "adr",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: $t({ id: "common.ADR" }),
    Cell: (row: any) => `${(row.adr || 0).toFixed(0)}`,
  },
  {
    id: "kd",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: $t({ id: "common.K/D" }),
    Cell: (row: any) => (
      <div
        className={classNames("text-center", {
          "text-success": row.kd >= 1,
          "text-danger": row.kd < 1,
        })}
      >
        {Number(row.kd).toFixed(2)}
      </div>
    ),
  },
  {
    id: "hs",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "%" + $t({ id: "common.HS" }),
    Cell: (row: any) => `${(row.hs || 0).toFixed(1)}%`,
  },
  {
    id: "kasts",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "%" + $t({ id: "common.Kast" }).toUpperCase(),
    Cell: (row: any) => `${(row.kasts || 0).toFixed(1)}%`,
  },
  {
    id: "3k",
    options: {
      align: "center",
      width: 90,
      sorting: true,
      visible: match.match_making_mode !== MATCH_MODE.Wingman,
    },
    Header: "3K",
    Cell: (row: any) => row.rounds_with_3_kills,
  },
  {
    id: "4k",
    options: {
      align: "center",
      width: 90,
      sorting: true,
      visible: match.match_making_mode !== MATCH_MODE.Wingman,
    },
    Header: "4K",
    Cell: (row: any) => row.rounds_with_4_kills,
  },
  {
    id: "5k",
    options: {
      align: "center",
      width: 90,
      sorting: true,
      visible: match.match_making_mode !== MATCH_MODE.Wingman,
    },
    Header: "5K",
    Cell: (row: any) => row.rounds_with_5_kills,
  },
  {
    id: "hltv_rating",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "HLTV Rating",
    Cell: (row: any) => row.hltv_rating?.toFixed(2),
  },
];
