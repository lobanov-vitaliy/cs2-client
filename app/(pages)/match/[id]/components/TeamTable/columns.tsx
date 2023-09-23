import Avatar from "@/app/components/Avatar";
import Rank from "@/app/components/Rank";
import { TypeColumn } from "@/app/components/Table";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import classNames from "classnames";
import Link from "next/link";

export const getColumns = (team: any): TypeColumn[] => [
  {
    id: "name",
    options: {
      loading: false,
    },
    Header: "",
    Cell: (row: any) => (
      <Link
        href={`/player/${row.steamid}/profile`}
        className="d-flex align-items-center d-flex justify-content-center  justify-content-md-start gap-2"
      >
        <Avatar
          src={row.avatar}
          size="xs"
          style={{
            border: `2px solid ${TEAM_PLAYER_COLOR[row.player_color]}`,
          }}
        />
        <Rank value={row.rank} />
        <h5 className="fs-13 mb-0 d-none d-md-block">{row.name}</h5>
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
    Header: "Kills",
    Cell: (row: any) => row.kills,
  },
  {
    id: "deaths",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "Deaths",
    Cell: (row: any) => row.deaths,
  },
  {
    id: "assists",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "Assists",
    Cell: (row: any) => row.assists,
  },
  {
    id: "adr",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "ADR",
    Cell: (row: any) => `${(row.adr || 0).toFixed(0)}`,
  },
  {
    id: "kd",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "K / D",
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
    Header: "HS %",
    Cell: (row: any) => `${(row.hs || 0).toFixed(1)}%`,
  },
  {
    id: "kasts",
    options: {
      align: "center",
      width: 90,
      sorting: true,
    },
    Header: "Kast %",
    Cell: (row: any) => `${(row.kasts || 0).toFixed(1)}%`,
  },
  {
    id: "3k",
    options: {
      align: "center",
      width: 90,
      sorting: true,
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
