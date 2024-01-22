import { Container } from "pixi.js";
import Player from "./entities/Player";

export type RoundDataType = {
  start_tick: number;
  end_tick: number;
  ticks_count: number;
  rounds_count: number;
  players: Record<
    string,
    {
      steamid: string;
      name: string;
      team: number;
      kills: number;
      assists: number;
      deaths: number;
      balance: number;
      weapon: string;
      inventory: string[];
      dead?: {
        x: number;
        y: number;
        tick: number;
      };
    }
  >;
  players_positions: Record<string, PlayerTickData>;
  events: Array<{
    name: string;
    tick: number;
    data?: any;
  }>;
  grenades_positions: Array<GrenadeTickData>;
};

export type GrenadeTickData = {
  id: number;
  x: number[];
  y: number[];
  z: number[];
  start_tick: number;
  end_tick: number;
  detonate_tick: number;
  team_number: number;
  type: string;
};

export type PlayerTickData = {
  start_tick: number;
  end_tick: number;
  x: number[];
  y: number[];
  view: number[];
  dead?: {
    x: number;
    y: number;
    tick: number;
  };
};

export type TeamRoundType = {
  id: string;
  team_number: number;
  count: number;
  score: number;
  players: Array<Player>;
  survived: number;
};

export interface ReplayObject extends Container {
  update(replayTick: number): void;
}
