"use client";

import { FC, createContext, PropsWithChildren, useContext } from "react";

type Session = {
  steamid: string;
  name: string;
  avatar: string;
  steamProfileUrl: string;
  token: string;
};
export const SessionContext = createContext<Session | null>(null);

export const useSession = () => useContext(SessionContext);

const SessionProvider: FC<PropsWithChildren<{ session: Session | null }>> = ({
  children,
  session,
}) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
