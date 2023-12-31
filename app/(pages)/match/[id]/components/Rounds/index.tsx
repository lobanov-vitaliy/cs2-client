"use client";

import Card from "@/components/Card";
import { FC } from "react";
import { useMatch } from "../../context";
import Avatar from "@/components/Avatar";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import { getColorByTeamNumber } from "@/app/utils/team";

type RoundsProps = {
  rounds: Array<{
    round_number: number;
    winner_team_number: number;
    reason: number;
    teams: Array<{
      id: string;
      team_number: number;
      count: number;
      survived: number;
      score: number;
    }>;
  }>;
};

const Rounds: FC<RoundsProps> = ({ rounds }) => {
  const match = useMatch();

  return (
    <div className="d-flex flex-column align-items-center gap-4 p-2 mt-4">
      {rounds.map((round, i) => {
        const isSwapRound =
          rounds[round.round_number] &&
          round.teams[0].team_number !==
            rounds[round.round_number].teams[0].team_number;
        const teams = round.teams.map((team) => {
          return {
            ...team,
            players: match.teams.find(({ id }: any) => id === team.id).players,
          };
        });
        return (
          <>
            <div
              key={round.round_number}
              className="d-flex align-items-center gap-3"
            >
              <div className="d-flex justify-content-between gap-2">
                {teams[0].players.map((player: any) => {
                  return (
                    <Avatar
                      key={player.steamid}
                      src={player.avatar}
                      size="sm"
                      style={{
                        border: `2px solid ${
                          TEAM_PLAYER_COLOR[player.player_color]
                        }`,
                      }}
                    />
                  );
                })}
              </div>
              <div className="text-center">
                <div>Round {round.round_number}</div>
                <div className="d-flex gap-1">
                  {teams.map((team) => {
                    return (
                      <div
                        key={team.id}
                        className="fs-4 text-center"
                        style={{
                          width: 30,
                          color: getColorByTeamNumber(team.team_number),
                        }}
                      >
                        {team.score}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="d-flex gap-2">
                {teams[1].players.map((player: any) => {
                  return (
                    <Avatar
                      key={player.steamid}
                      src={player.avatar}
                      size="sm"
                      style={{
                        border: `2px solid ${
                          TEAM_PLAYER_COLOR[player.player_color]
                        }`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
            {isSwapRound && (
              <div className="mdi mdi-reload fs-5 d-flex justify-content-center align-items-center" />
            )}

            {i === rounds.length - 1 && (
              <div className="mdi mdi-trophy fs-5 d-flex justify-content-center align-items-center" />
            )}
          </>
        );
      })}
    </div>
  );
};

export default Rounds;
