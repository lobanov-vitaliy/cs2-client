import ReplayContainer from "./replay-container";

export const getPosition = (point: { x: number; y: number }) => {
  const map = ReplayContainer.map;
  return {
    x: Math.trunc((point.x - map.x) / map.scale),
    y: Math.trunc((map.y - point.y) / map.scale),
  };
};

export const lerp = (prev: number, current: number) => {
  if (!prev) {
    return current;
  }

  const smoothFactor = 0.4;
  return (1.0 - smoothFactor) * prev + smoothFactor * current;
};
