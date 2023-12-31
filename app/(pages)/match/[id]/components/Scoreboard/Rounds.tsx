import { Fragment, FC } from "react";
import { getColorByTeamNumber } from "@/app/utils/team";
import Reason from "../Reason";
import Popover from "@/components/Popover";
import RoundInfo from "@/components/RoundInfo";

type RoundsProps = {
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

const Rounds: FC<RoundsProps> = ({ rounds, match }) => {
  return (
    <div className="d-none d-lg-flex justify-content-center gap-2 py-3">
      {rounds.map((round, i: number) => {
        const isSwapRound =
          rounds[i + 1] &&
          round.teams[0].team_number !== rounds[i + 1].teams[0].team_number;

        return (
          <Fragment key={round.round_number}>
            <div className="d-flex justify-content-center flex-column gap-1">
              <div className="d-flex flex-column flex-column-reverse gap-1">
                {[...new Array(round.teams[0].count)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 1,
                      background:
                        i < round.teams[0].survived
                          ? getColorByTeamNumber(round.teams[0].team_number)
                          : "rgba(255,255,255,0.2)",
                    }}
                    className="w-100"
                  />
                ))}
              </div>
              <Reason
                reason={round.reason}
                winner={round.winner_team_number}
                team={round.teams[0]}
              />
              <div
                style={{
                  width: 24,
                  height: 24,
                  border: `1px solid ${getColorByTeamNumber(
                    round.winner_team_number
                  )}`,
                }}
                className="d-flex fs-5 justify-content-center align-items-center bg-opacity-25"
              >
                <Popover
                  placement="bottom"
                  className="popover mw-100 p-3"
                  trigger={
                    <div className="cursor-pointer">{round.round_number}</div>
                  }
                >
                  <RoundInfo round={round.round_number} match={match} />
                </Popover>
              </div>
              <Reason
                reason={round.reason}
                winner={round.winner_team_number}
                team={round.teams[1]}
              />
              <div className="d-flex flex-column gap-1">
                {[...new Array(round.teams[1].count)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 1,
                      background:
                        i < round.teams[1].survived
                          ? getColorByTeamNumber(round.teams[1].team_number)
                          : "rgba(255,255,255,0.2)",
                    }}
                    className="w-100"
                  />
                ))}
              </div>
            </div>
            {isSwapRound && (
              <div className="mdi mdi-reload fs-5 d-flex justify-content-center align-items-center" />
            )}

            {i === rounds.length - 1 && (
              <div className="mdi mdi-trophy fs-5 d-flex justify-content-center align-items-center" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Rounds;
