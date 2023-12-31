export const TEAM_PLAYER_COLOR = [
  "#89cef5",
  "#009f81",
  "#f1e442",
  "#e6812b",
  "#be2d97",
];

export enum ROUND_END_REASON {
  TargetBombed = 1, // Target Successfully Bombed!
  BombDefused = 7, // The bomb has been defused!
  CTWin = 8, // Counter-Terrorists Win!
  TerroristWin = 9, // Terrorists Win!
  TerroristsSurrender = 17, // Terrorists Surrender
  CTSurrender = 18, // CTs Surrender
  TargetSaved = 12, // Target has been saved!
}

export enum MATCH_MODE {
  Undefined = 0,
  Wingman = 1,
  Premier = 2,
  Competitive = 3,
}
