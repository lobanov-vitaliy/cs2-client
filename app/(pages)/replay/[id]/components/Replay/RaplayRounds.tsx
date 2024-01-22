import Reason from "@/app/(pages)/match/[id]/components/Reason";
import { getColorByTeamNumber } from "@/app/utils/team";
import classNames from "classnames";
import { FC } from "react";

type RaplayRoundsProps = {
  current: number;
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
  onChange: (round: number) => void;
};

function splitArray(
  array: RaplayRoundsProps["rounds"],
  indexes: Array<number>
) {
  const resultArrays = [];
  let start = 0;

  for (const index of indexes) {
    const subArray = array.slice(start, index);
    resultArrays.push(subArray);
    start = index;
  }

  resultArrays.push(array.slice(start));

  return resultArrays;
}

const RaplayRounds: FC<RaplayRoundsProps> = ({ rounds, current, onChange }) => {
  const indexes = rounds
    .filter(
      (round, i) =>
        rounds[i + 1] &&
        round.teams[0].team_number !== rounds[i + 1].teams[0].team_number
    )
    .map((round) =>
      rounds.findIndex((r) => r.round_number === round.round_number)
    );
  const groups = splitArray(
    rounds,
    indexes.map((i) => i + 1)
  );
  return (
    <div className="d-flex">
      {groups.map((rounds, i) => (
        <>
          <div className="d-flex gap-1" key={i}>
            {rounds.map((round, i) => {
              return (
                <div
                  key={round.round_number}
                  className="d-flex align-items-center flex-column justify-content-center"
                >
                  <Reason
                    reason={round.reason}
                    winner={round.winner_team_number}
                  />
                  <button
                    type="button"
                    style={{
                      minWidth: 30,
                      borderBottomColor: getColorByTeamNumber(
                        round.winner_team_number
                      ),
                    }}
                    onClick={() => onChange(round.round_number)}
                    className={classNames("btn btn-dark btn-sm btn-border", {
                      active: current === round.round_number,
                    })}
                  >
                    {round.round_number}
                  </button>
                </div>
              );
            })}
          </div>
          {i !== groups.length - 1 && (
            <div className="mdi px-2 mdi-rotate-3d-variant fs-5 d-flex justify-content-center align-items-center" />
          )}
        </>
      ))}
    </div>
  );
};

export default RaplayRounds;
