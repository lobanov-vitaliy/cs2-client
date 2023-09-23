"use client";

import Card from "@/app/components/Card";
import Table from "@/app/components/Table";
import { FC, useEffect, useMemo, useState } from "react";
import { getColumns } from "./columns";
import SideSwicher from "@/app/components/SideSwicher";

const Activity: FC<{ match: any }> = ({ match }) => {
  const [side, setSide] = useState(0);
  const [data, setData] = useState<any[] | null>(null);
  const [sort, setSort] = useState<any>();

  const teams = useMemo(() => {
    return match.teams.map((team: any, i: number) => ({
      ...team,
      name: team.name || "Team " + (i ? "B" : "A"),
      players: team.players
        .map((player: any) => ({
          ...player,
          ...(data || []).find(
            ({ steamid }: any) => steamid === player.steamid
          ),
        }))
        .sort((a: any, b: any) => {
          if (sort) {
            return sort.type === "desc"
              ? a[sort.field] - b[sort.field]
              : b[sort.field] - a[sort.field];
          }

          return 1;
        }),
    }));
  }, [match, data, sort]);

  useEffect(() => {
    const fetchData = async () => {
      let params: Record<string, string> = {};

      if (side) {
        params.team_number = String(side);
      }

      const response = await fetch(
        `/api/matches/${match.match_id}/activity?${new URLSearchParams(params)}`
      );
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, [match, side]);

  return (
    <>
      <SideSwicher value={side} onChange={setSide} />
      {teams.map((team: any) => (
        <Card key={team.id}>
          <Table
            sort={sort}
            onSort={setSort}
            loading={data === null}
            columns={getColumns(team)}
            data={team.players}
          />
        </Card>
      ))}
    </>
  );
};

export default Activity;
