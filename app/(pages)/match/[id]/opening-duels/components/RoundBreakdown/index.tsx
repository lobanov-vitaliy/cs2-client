import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import { intervalToDuration } from "date-fns";
import { FC } from "react";

const RoundBreakdown: FC<{ roundBreakdown: any[]; match: any }> = ({
  roundBreakdown,
  match,
}) => {
  const players = match.teams.reduce(
    (players: any, team: any) => [...players, ...team.players],
    []
  );
  return (
    <Card>
      <div className="table-responsive">
        <table className="table table-nowrap table-sm table-striped align-middle caption-top table-borderless mb-0">
          <thead className="table-light">
            <tr>
              <th className="text-center">Round</th>
              <th>Attacker</th>
              <th className="text-center">Attacker Side</th>
              <th className="text-center">Attacker Weapon</th>
              <th>Victim</th>
              <th className="text-center">Victim Side</th>
              <th className="text-center">Round Time</th>
            </tr>
          </thead>
          <tbody>
            {roundBreakdown.map((round: any) => {
              const duration = intervalToDuration({
                start: 0,
                end: Math.round(round.round_time) * 1000,
              });

              const attaker = players.find(
                (player: any) => player.steamid === round.attacker.steamid
              );
              const user = players.find(
                (player: any) => player.steamid === round.user.steamid
              );

              return (
                <tr key={round.round_number}>
                  <td className="text-center">{round.round_number}</td>
                  <td>
                    <div className="d-flex align-items-center d-flex justify-content-center  justify-content-md-start gap-2">
                      <Avatar
                        src={attaker.avatar}
                        size="xs"
                        style={{
                          border: `2px solid ${
                            TEAM_PLAYER_COLOR[attaker.player_color]
                          }`,
                        }}
                      />
                      <h5 className="fs-13 mb-0 d-none d-md-block">
                        {attaker.name}
                      </h5>
                    </div>
                  </td>
                  <td className="text-center">
                    {round.attacker.team_number === 3 ? "CT" : "T"}
                  </td>
                  <td className="text-center">{round.attacker.weapon}</td>
                  <td>
                    <div className="d-flex align-items-center d-flex justify-content-center justify-content-md-start gap-2">
                      <Avatar
                        src={user.avatar}
                        size="xs"
                        style={{
                          border: `2px solid ${
                            TEAM_PLAYER_COLOR[user.player_color]
                          }`,
                        }}
                      />
                      <h5 className="fs-13 mb-0 d-none d-md-block">
                        {user.name}
                      </h5>
                    </div>
                  </td>
                  <td className="text-center">
                    {round.user.team_number === 3 ? "CT" : "T"}
                  </td>
                  <td className="text-center">{`${duration.minutes}:${duration.seconds}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RoundBreakdown;
