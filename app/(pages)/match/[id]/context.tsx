"use client";

import {
  FC,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

type Match = any;
export const MatchContext = createContext<Match | null>(null);

export const useMatch = () => {
  const match = useContext(MatchContext);

  return useMemo(() => {
    return {
      ...match,
      players: match.teams.reduce(
        (players: any, team: any) => [...players, ...team.players],
        []
      ),
    };
  }, [match]);
};

const MatchProvider: FC<PropsWithChildren<{ match: Match | null }>> = ({
  children,
  match,
}) => {
  return (
    <MatchContext.Provider value={match}>{children}</MatchContext.Provider>
  );
};

export default MatchProvider;
