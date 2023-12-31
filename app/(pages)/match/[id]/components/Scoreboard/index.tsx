"use client";

import { FC, useMemo, useState } from "react";
import SideSwicher from "@/app/components/SideSwicher";
import TeamTable from "../TeamTable";
import Rounds from "./Rounds";
import { useIntl } from "react-intl";
import { useMatch } from "../../context";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import useUpdateEffect from "@/app/hooks/useUpdateEffect";

type ScoreboardProps = {
  leaders: any;
  scoreboard: any;
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

const Scoreboard: FC<ScoreboardProps> = ({
  rounds,
  leaders,
  scoreboard: defaultScoreboard,
}) => {
  const { $t } = useIntl();
  const match = useMatch();
  const [side, setSide] = useState(0);
  const [sort, setSort] = useState<any>();
  const [scoreboard, setScoreboard] = useState<any[]>(defaultScoreboard);

  const teams = useMemo(() => {
    return match.teams.map((team: any, i: number) => ({
      ...team,
      name: team.name || $t({ id: "common.Team" }) + " " + (i ? "B" : "A"),
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

  useUpdateEffect(() => {
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
      <div className="d-flex align-items-center gap-3">
        {(leaders || []).map((leader: any, index: number) => {
          console.log("leader", leader);
          const player = match.players.find(
            (player: any) => player.steamid === leader.steamid
          );
          return (
            <Card
              bordered={false}
              key={player.steamid}
              className="flex-grow-1 my-3"
              style={{
                border: `1px solid ${["#d4af37", "#c0c0c0", "#cd7f32"][index]}`,
              }}
            >
              <div className="d-flex align-items-center justify-content-between gap-1  p-2">
                <div className="d-flex align-items-center gap-2">
                  <Avatar size="xs" src={player.avatar} />
                  <div className="fs-5">{player.name}</div>
                </div>
                <div className="d-flex align-items-center gap-3 text-muted">
                  <div>
                    {[leader.kills, leader.deaths, leader.assists].join(" / ")}
                  </div>
                  <div>{leader.hltv_rating.toFixed(2)}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <SideSwicher value={side} onChange={setSide} />

      <TeamTable
        sort={sort}
        onSort={setSort}
        loading={scoreboard === null}
        team={teams[0]}
      />
      <Rounds rounds={rounds} match={match} />
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
