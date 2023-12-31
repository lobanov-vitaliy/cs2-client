"use client";

import { FC, useMemo, useState } from "react";
import OpeningDuelsTable from "../OpeningDuelsTable";
import SideSwicher from "@/app/components/SideSwicher";
import { useMatch } from "../../../context";

type OpeningDuelsProps = {
  openingDuels: {
    round_breakdown: Array<{
      round_time: number;
      round_number: number;
      user: {
        steamid: string;
        team_number: number;
      };
      attacker: {
        steamid: string;
        team_number: number;
        weapon: string;
      };
    }>;
    players: Array<{
      played_rounds: number;
      steamid: string;
      team_number: number;
    }>;
  };
};

const OpeningDuels: FC<OpeningDuelsProps> = ({ openingDuels }) => {
  const match = useMatch();
  const [side, setSide] = useState(0);
  const [sort, setSort] = useState<any>();

  const teams = useMemo(() => {
    const players = match.teams.reduce(
      (players: any, team: any) => [...players, ...team.players],
      []
    );
    return match.teams.map((team: any, i: number) => ({
      ...team,
      name: team.name || "Team " + (i ? "B" : "A"),
      players: team.players
        .map((player: any) => {
          const getMax = (obj: Record<string, number>) =>
            Object.keys(obj)
              .reverse()
              .reduce((a, b) => (obj[a] > obj[b] ? a : b), "");
          const {
            success,
            attempts,
            best_weapon,
            most_died_to,
            most_killed_player,
          } = openingDuels.round_breakdown.reduce(
            (data, round) => {
              if (
                ((side === 0 || side === round.attacker.team_number) &&
                  player.steamid === round.attacker.steamid) ||
                ((side === 0 || side === round.user.team_number) &&
                  player.steamid === round.user.steamid)
              ) {
                return {
                  ...data,
                  attempts: data.attempts + 1,
                  best_weapon:
                    player.steamid === round.attacker.steamid
                      ? {
                          ...data.best_weapon,
                          [round.attacker.weapon]:
                            (data.best_weapon[round.attacker.weapon] || 0) + 1,
                        }
                      : data.best_weapon,
                  most_died_to:
                    player.steamid === round.user.steamid
                      ? {
                          ...data.most_died_to,
                          [round.attacker.weapon]:
                            (data.most_died_to[round.attacker.weapon] || 0) + 1,
                        }
                      : data.most_died_to,
                  most_killed_player:
                    player.steamid === round.attacker.steamid
                      ? {
                          ...data.most_killed_player,
                          [round.user.steamid]:
                            (data.most_killed_player[round.user.steamid] || 0) +
                            1,
                        }
                      : data.most_killed_player,
                  success:
                    data.success +
                    Number(player.steamid === round.attacker.steamid),
                };
              }

              return data;
            },
            {
              success: 0,
              attempts: 0,
              best_weapon: {},
              most_died_to: {},
              most_killed_player: {},
            } as {
              success: number;
              attempts: number;
              best_weapon: Record<string, number>;
              most_died_to: Record<string, number>;
              most_killed_player: Record<string, number>;
            }
          );
          let mostKilledPlayer = getMax(most_killed_player);
          if (mostKilledPlayer) {
            mostKilledPlayer = players.find(
              (player: any) => player.steamid === mostKilledPlayer
            );
          }
          return {
            ...player,
            rounds:
              side === 0
                ? openingDuels.round_breakdown.length
                : openingDuels.players.find(
                    (p: any) =>
                      side === p.team_number && player.steamid === p.steamid
                  )?.played_rounds || 0,
            success,
            attempts,
            most_died_to: getMax(most_died_to),
            best_weapon: getMax(best_weapon),
            most_killed_player: mostKilledPlayer,
          };
        })
        .sort((a: any, b: any) => {
          if (sort) {
            return sort.type === "desc"
              ? a[sort.field] - b[sort.field]
              : b[sort.field] - a[sort.field];
          }

          return 1;
        }),
    }));
  }, [match, openingDuels, side, sort]);

  return (
    <>
      <SideSwicher value={side} onChange={setSide} />
      {teams.map((team: any) => (
        <OpeningDuelsTable
          sort={sort}
          onSort={setSort}
          key={team.id}
          team={team}
        />
      ))}
    </>
  );
};

export default OpeningDuels;
