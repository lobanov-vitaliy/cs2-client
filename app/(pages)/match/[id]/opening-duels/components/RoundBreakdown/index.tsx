"use client";

import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import { FC } from "react";
import { useMatch } from "../../../context";
import { useIntl } from "react-intl";
import { seconds2timestring } from "@/app/utils/time";
import Weapon from "../../../components/Weapon";

const RoundBreakdown: FC<{ roundBreakdown: any[] }> = ({ roundBreakdown }) => {
  const { $t } = useIntl();
  const match = useMatch();
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
              <th className="text-center">{$t({ id: "common.Round" })}</th>
              <th>{$t({ id: "common.Attacker" })}</th>
              <th className="text-center">
                {$t({ id: "common.Attacker Side" })}
              </th>
              <th className="text-center">
                {$t({ id: "common.Attacker Weapon" })}
              </th>
              <th>{$t({ id: "common.Victim" })}</th>
              <th className="text-center">
                {$t({ id: "common.Victim Side" })}
              </th>
              <th className="text-center">{$t({ id: "common.Round Time" })}</th>
            </tr>
          </thead>
          <tbody>
            {roundBreakdown.map((round: any) => {
              const attaker = players.find(
                (player: any) => player.steamid === round.attacker.steamid
              );
              const user = players.find(
                (player: any) => player.steamid === round.user.steamid
              );

              if (!attaker || !user) {
                return null;
              }

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
                  <td className="text-center">
                    <Weapon name={round.attacker.weapon} />
                  </td>
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
                  <td className="text-center">
                    {seconds2timestring(round.round_time)}
                  </td>
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
