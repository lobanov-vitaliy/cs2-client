"use client";

import { FC } from "react";
import classes from "./Rank.module.scss";
import classNames from "classnames";
import { useMatch } from "@/app/(pages)/match/[id]/context";
import { MATCH_MODE } from "@/app/consts";

const levels = [
  [0, 4999],
  [5000, 9999],
  [10000, 14999],
  [15000, 19999],
  [20000, 24999],
  [25000, 29999],
  [30000, 35000],
];

export const PremierRank: FC<{ value: number }> = ({ value }) => {
  const level = levels.findIndex(([min, max]) => value >= min && value <= max);
  const [a, b, c] = String(value).match(/^([0-9]+)([0-9]{3})$/) || [];
  return (
    <div
      className={classNames(
        "d-flex bg-dark bg-opacity-50",
        classes.rank,
        classes[`level-${level}`]
      )}
    >
      <div className={classes.line} />
      <div className={classes.line} />
      {value ? (
        <div className={classNames(classes.value)}>
          <span className="fs-5 fst-italic">
            {b}
            <span className="fs-6">,{c}</span>
          </span>
        </div>
      ) : (
        <div className={classNames(classes.zero)}>
          <div />
          <div />
          <div />
        </div>
      )}
    </div>
  );
};

export const WingmanRank: FC<{ value: number }> = ({ value }) => {
  return (
    <img
      className={classes.rank}
      alt="rank"
      src={`/assets/ranks/matchmaking_wingman${value || 0}.png`}
    />
  );
};

export const CompetitiveRank: FC<{ value: number }> = ({ value }) => {
  return (
    <img
      className={classes.rank}
      alt="rank"
      src={`/assets/ranks/matchmaking${value || 0}.png`}
    />
  );
};

export const RankByMatchMode: FC<{ value: number; mode?: number }> = ({
  value,
  mode = MATCH_MODE.Competitive,
}) => {
  if (mode === MATCH_MODE.Wingman) {
    return <WingmanRank value={value} />;
  }

  if (mode === MATCH_MODE.Premier) {
    return <PremierRank value={value} />;
  }

  return <CompetitiveRank value={value} />;
};

export const MatchRank: FC<{ value: number }> = ({ value }) => {
  const { match_making_mode } = useMatch();
  return <RankByMatchMode value={value} mode={match_making_mode} />;
};
