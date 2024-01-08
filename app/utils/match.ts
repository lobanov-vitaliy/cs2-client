import { MATCH_MODE } from "../consts";

export const getMapTitle = (name: string) => {
  const title = name?.split("_").pop() as string;

  return title?.charAt(0).toUpperCase() + title?.slice(1);
};

export const getMatchModeTranslateKey = (mode: MATCH_MODE) => {
  switch (mode) {
    case MATCH_MODE.Premier:
      return "common.Premier";
    case MATCH_MODE.Competitive:
      return "common.Competitive";
    case MATCH_MODE.Wingman:
      return "common.Wingman";
  }

  return "common.n/a";
};
