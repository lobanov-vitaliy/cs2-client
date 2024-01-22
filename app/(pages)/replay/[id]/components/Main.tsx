"use client";

import { FC, useEffect, useState } from "react";
import { TeamRoundType } from "../types";
import { Application, Loader } from "pixi.js";
import { Viewport } from "pixi-viewport";
import Replay from "./Replay";

const Main: FC<{
  match: any;
  rounds: Array<{
    round_number: number;
    winner_team_number: number;
    reason: number;
    teams: Array<TeamRoundType>;
  }>;
}> = ({ match, rounds }) => {
  const [isReady, setIsReady] = useState(false);
  const width = 1024;
  const height = 1024;

  const app = new Application({
    backgroundColor: 0x1a1d21,
    width,
    height,
    resizeTo: window,
  });

  const viewport = new Viewport({
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    worldWidth: width,
    worldHeight: height,
    passiveWheel: false,
    interaction: app.renderer.plugins.interaction,
  });

  useEffect(() => {
    Loader.shared
      .add(["/assets/sprites/he.json", "/assets/sprites/c4-0.json"])
      .load(() => {
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Replay
      width={width}
      height={height}
      match={match}
      rounds={rounds}
      viewport={viewport}
      app={app}
    />
  );
};

export default Main;
