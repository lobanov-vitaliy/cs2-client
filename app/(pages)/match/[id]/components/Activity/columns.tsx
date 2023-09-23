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
    id: "damage",
    Header: "Total Damage",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => row.damage,
  },
  {
    id: "hegrenade",
    Header: "HE Damage",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => row.hegrenade,
  },
  {
    id: "inferno",
    Header: "Molotov Damage",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => row.inferno,
  },
  {
    id: "enemies_flashed",
    Header: "Enemies Flashed",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => row.enemies_flashed,
  },
  {
    id: "shots_fired",
    Header: "Shots Fired",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => "n/a",
  },
  {
    id: "damage_per_shot",
    Header: "Damage  Per Shot",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) => "n/a",
  },
  {
    id: "survived_rounds",
    Header: "Rounds Survived",
    options: {
      align: "center",
      width: 150,
      sorting: true,
    },
    Cell: (row) =>
      `${row.survived_rounds} (${(
        (row.survived_rounds / row.played_rounds) *
        100
      ).toFixed(0)}%)`,
  },
];
