"use client";

import { getColorByTeamNumber } from "@/app/utils/team";
import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";

type PlayerMatchRoundsType = {
  player_id: string;
  match: any;
};

type RoundsType = {
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
  playerRounds: Array<{
    round_number: number;
    winner: number;
    damage: number;
    team_number: number;
    kills: number;
    is_played: boolean;
    is_died: boolean;
    is_kast: boolean;
    is_won: boolean;
  }>;
};

const PlayerMatchRounds: FC<PlayerMatchRoundsType> = ({ player_id, match }) => {
  const { $t } = useIntl();
  const [data, setData] = useState<RoundsType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const [rounds, playerRounds] = await Promise.all([
        fetch(`/api/matches/${match.match_id}/rounds`).then((response) =>
          response.json()
        ),
        fetch(`/api/player/${player_id}/match/${match.match_id}/rounds`).then(
          (response) => response.json()
        ),
      ]);

      setData({ rounds, playerRounds });
    };

    fetchData();
  }, [player_id, match.match_id]);

  if (data === null) {
    return (
      <div className="align-items-center d-flex justify-content-center p-3">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center gap-2 pt-3">
      {data.rounds.map(({ round_number, teams }, i: number) => {
        const isSwapRound =
          data.rounds[round_number] &&
          teams[0].team_number !==
            data.rounds[round_number].teams[0].team_number;

        const round = data.playerRounds.find(
          (round) => round.round_number === round_number
        );

        return (
          <Fragment key={round_number}>
            <div className="d-flex justify-content-end flex-column">
              <div
                className="d-flex justify-content-center position-relative"
                style={{
                  background: round?.is_kast
                    ? "linear-gradient(0deg, rgba(245, 166, 35,0.1) 5%, rgba(0,0,0,0) 100%)"
                    : "",
                }}
              >
                {round?.is_kast && (
                  <span
                    style={{
                      transform: "rotate(-90deg)",
                    }}
                    className="text-muted position-absolute"
                  >
                    {$t({ id: "common.Kast" })}
                  </span>
                )}
                <div
                  style={{ zIndex: 10, height: 100 }}
                  className="d-flex flex-column justify-content-end gap-1 py-1"
                >
                  {[...new Array(5)].map((_, index) => (
                    <div key={index}>
                      {5 - (round?.kills || 0) <= index && (
                        <svg
                          className="d-flex"
                          style={{
                            color: getColorByTeamNumber(
                              round?.team_number || 0
                            ),
                          }}
                          width={16}
                          height={16}
                          fill="currentColor"
                        >
                          <path d="M1.095 9.2C1.272 9.168-.21.085 7.69.003V0h.621v.002c7.9.082 6.417 9.165 6.594 9.199.177.033 1.084.552.243 1.161-.697.504-.558 1.071-1.012 1.917-.453.845-1.419.288-2.366.608-.946.322-.236 1.458-.808 2.253-.547.761-2.772.868-2.962.86-.19.008-2.415-.099-2.962-.86-.572-.795.138-1.931-.808-2.253-.947-.32-1.913.237-2.366-.608-.454-.846-.315-1.412-1.012-1.917-.84-.609.066-1.128.243-1.161zm7.729.305c.218 1.39 2.983.857 3.522.474.583-.416.583-2.39-.315-2.526-.897-.135-3.342 1.195-3.207 2.052zm-.97 3.157c.076-.083.12-.21.146-.35.026.14.07.267.145.35.163.178.662-.057.673-.778.012-.722-.816-1.477-.816-1.477s-.831.755-.82 1.477c.01.721.51.956.673.778zm-4.34-2.683c.538.383 3.304.916 3.522-.474.135-.857-2.31-2.187-3.208-2.052-.897.135-.897 2.11-.314 2.526z" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: 24,
                  height: 24,
                  border: `1px solid ${getColorByTeamNumber(
                    round?.winner || 0
                  )}`,
                }}
                className="d-flex fs-5 justify-content-center align-items-center bg-opacity-25"
              >
                {round_number}
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: 24,
                  height: 24,
                }}
              >
                {round?.is_played ? (
                  <>
                    {round?.is_died && (
                      <svg
                        className="df"
                        style={{ color: "rgb(237, 94, 94)" }}
                        width={16}
                        height={16}
                        fill="currentColor"
                      >
                        <path d="M1.095 9.2C1.272 9.168-.21.085 7.69.003V0h.621v.002c7.9.082 6.417 9.165 6.594 9.199.177.033 1.084.552.243 1.161-.697.504-.558 1.071-1.012 1.917-.453.845-1.419.288-2.366.608-.946.322-.236 1.458-.808 2.253-.547.761-2.772.868-2.962.86-.19.008-2.415-.099-2.962-.86-.572-.795.138-1.931-.808-2.253-.947-.32-1.913.237-2.366-.608-.454-.846-.315-1.412-1.012-1.917-.84-.609.066-1.128.243-1.161zm7.729.305c.218 1.39 2.983.857 3.522.474.583-.416.583-2.39-.315-2.526-.897-.135-3.342 1.195-3.207 2.052zm-.97 3.157c.076-.083.12-.21.146-.35.026.14.07.267.145.35.163.178.662-.057.673-.778.012-.722-.816-1.477-.816-1.477s-.831.755-.82 1.477c.01.721.51.956.673.778zm-4.34-2.683c.538.383 3.304.916 3.522-.474.135-.857-2.31-2.187-3.208-2.052-.897.135-.897 2.11-.314 2.526z" />
                      </svg>
                    )}
                  </>
                ) : (
                  <i className="mdi mdi-signal-off" />
                )}
              </div>
            </div>
            {isSwapRound && (
              <div className="mdi mdi-rotate-3d-variant fs-5 d-flex justify-content-center align-items-center" />
            )}
            {i === data.rounds.length - 1 && (
              <div className="mdi mdi-trophy fs-5 d-flex justify-content-center align-items-center" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default PlayerMatchRounds;
