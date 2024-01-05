"use client";

import { FC } from "react";
import classes from "./Rank.module.scss";
import classNames from "classnames";
import { useMatch } from "@/app/(pages)/match/[id]/context";
import { MATCH_MODE } from "@/app/consts";

export const RANK_LEVELS = [
  [0, 4999],
  [5000, 9999],
  [10000, 14999],
  [15000, 19999],
  [20000, 24999],
  [25000, 29999],
  [30000, 35000],
];

export const RANK_COLORS = [
  "#b0c3d9",
  "#8cc6ff",
  "#6a7dff",
  "#c166ff",
  "#f03cff",
  "#eb4b4b",
  "gold",
];

export const RANK_TITLE = {
  1: "Silver I",
  2: "Silver II",
  3: "Silver III",
  4: "Silver IV",
  5: "Silver Elite",
  6: "Silver Elite Master",
  7: "Gold Nova I",
  8: "Gold Nova II",
  9: "Gold Nova III",
  10: "Gold Nova Master",
  11: "Master Guardian I",
  12: "Master Guardian II",
  13: "Master Guardian Elite",
  14: "Distinguished Master Guardian",
  15: "Legendary Eagle",
  16: "Legendary Eagle Master",
  17: "Supreme Master First Class",
  18: "Global Elite",
} as any;

export const PremierRank: FC<{ value: number }> = ({ value }) => {
  const level = RANK_LEVELS.findIndex(
    ([min, max]) => value >= min && value <= max
  );
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
