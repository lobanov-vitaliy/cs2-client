"use client";

import { FC, useEffect, useMemo, useState } from "react";
import SideSwicher from "@/app/components/SideSwicher";
import TeamTable from "../TeamTable";
import Rounds from "./Rounds";
import Card from "@/app/components/Card";

type ScoreboardProps = {
  match: any;
  rounds: Array<{
    round_number: number;
    winner_team_number: number;
    reason: number;
    teams: Array<{
      id: string;
      team_number: number;
      count: number;
      survived: number;
    }>;
  }>;
};

const Scoreboard: FC<ScoreboardProps> = ({ match, rounds }) => {
  const [side, setSide] = useState(0);
  const [sort, setSort] = useState<any>();
  const [scoreboard, setScoreboard] = useState<any[] | null>(null);

  const teams = useMemo(() => {
    return match.teams.map((team: any, i: number) => ({
      ...team,
      name: team.name || "Team " + (i ? "B" : "A"),
      players: team.players
        .map((player: any) => ({
          ...player,
          ...(scoreboard || []).find(
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
  }, [match, scoreboard, sort, rounds]);

  useEffect(() => {
    const fetchScoreboard = async () => {
      let params: Record<string, string> = {};

      if (side) {
        params.team_number = String(side);
      }

      const response = await fetch(
        `/api/matches/${match.match_id}/scoreboard?${new URLSearchParams(
          params
        )}`
      );
      const data = await response.json();
      setScoreboard(data);
    };

    fetchScoreboard();
  }, [match, side]);

  return (
    <div className="mb-4">
      <SideSwicher value={side} onChange={setSide} />

      <TeamTable
        sort={sort}
        onSort={setSort}
        loading={scoreboard === null}
        team={teams[0]}
      />
      <Rounds rounds={rounds} />
      <TeamTable
        sort={sort}
        onSort={setSort}
        loading={scoreboard === null}
        team={teams[1]}
      />
    </div>
  );
};

export default Scoreboard;
