export const getColorByTeamNumber = (team_number: number, opacity = 1) => {
  return team_number === 2
    ? `rgb(176, 158, 107, ${opacity})`
    : `rgb(139, 161, 178, ${opacity})`;
};
