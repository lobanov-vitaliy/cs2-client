import Avatar from "@/app/components/Avatar";
import Rank from "@/app/components/Rank";
import { TypeColumn } from "@/app/components/Table";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import Link from "next/link";

export const getColumns = (team: any): TypeColumn[] => [
  {
    id: "name",
    options: {
      loading: false,
    },
    Header: team.name,
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
        <Rank value={row.rank} />
        <h5 className="fs-13 mb-0 d-none d-md-block">{row.name}</h5>
      </Link>
    ),
  },
  {
    id: "attempts",
    Header: "Attempts",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) =>
      `${
        row.attempts ? Number((row.attempts / row.rounds) * 100).toFixed(0) : 0
      }%`,
  },
  {
    id: "success",
    Header: "Success",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) =>
      `${
        row.success ? Number((row.success / row.attempts) * 100).toFixed(0) : 0
      }%`,
  },
  {
    id: "traded",
    Header: "Traded",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => "n/a",
  },
  {
    id: "most_killed_player",
    Header: "Most Killed Player",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row: any) => row.most_killed_player?.name || "n/a",
  },
  {
    id: "best_weapon",
    Header: "Best Weapon",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => row.best_weapon || "n/a",
  },
  {
    id: "most_died_to",
    Header: "Most Died To",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => row.most_died_to || "n/a",
  },
];
