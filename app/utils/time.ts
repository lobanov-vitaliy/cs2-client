import { daysInWeek, intervalToDuration } from "date-fns";

export const seconds2timestring = (value: number) => {
  const duration = intervalToDuration({
    start: 0,
    end: Math.round(value) * 1000,
  });
  const minutes =
    Number(duration.minutes) >= 10 ? duration.minutes : `0${duration.minutes}`;
  const seconds =
    Number(duration.seconds) >= 10 ? duration.seconds : `0${duration.seconds}`;

  return `${minutes}:${seconds}`;
};
