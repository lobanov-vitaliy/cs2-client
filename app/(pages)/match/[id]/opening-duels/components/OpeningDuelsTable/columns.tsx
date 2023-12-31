import Avatar from "@/app/components/Avatar";
import { TypeColumn } from "@/app/components/Table";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import { MatchRank } from "@/components/Rank";
import Link from "next/link";
import Weapon from "../../../components/Weapon";

export const getColumns = (team: any, $t: any): TypeColumn[] => [
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
        <MatchRank value={row.rank} />
        <h5 className="fs-13 mb-0 d-none d-md-block">{row.name}</h5>
      </Link>
    ),
  },
  {
    id: "attempts",
    Header: $t({ id: "common.Attempts" }),
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
    Header: $t({ id: "common.Success" }),
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
    Header: $t({ id: "common.Traded" }),
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => $t({ id: "common.n/a" }),
  },
  {
    id: "most_killed_player",
    Header: $t({ id: "common.Most Killed Player" }),
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row: any) =>
      row.most_killed_player?.name || $t({ id: "common.n/a" }),
  },
  {
    id: "best_weapon",
    Header: $t({ id: "common.Best Weapon" }),
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) =>
      row.best_weapon ? (
        <Weapon name={row.best_weapon} />
      ) : (
        $t({ id: "common.n/a" })
      ),
  },
  {
    id: "most_died_to",
    Header: $t({ id: "common.Most Died To" }),
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) =>
      row.most_died_to ? (
        <Weapon name={row.most_died_to} />
      ) : (
        $t({ id: "common.n/a" })
      ),
  },
];
