import Weapon from "@/app/(pages)/match/[id]/components/Weapon";
import { getColorByTeamNumber } from "@/app/utils/team";
import classNames from "classnames";
import { FC, useEffect } from "react";
import { TeamRoundType } from "../../types";
import {
  isC4,
  isKit,
  isPrimary,
  isSecondary,
  isUtility,
} from "@/app/utils/weapon";
import Player from "../../entities/Player";
import usePrevious from "@/app/hooks/usePrevious";
import AnimatedNumber from "@/components/AnimatedNumber";
import { useIntl } from "react-intl";

type TeamProps = {
  team: TeamRoundType;
  placement: "left" | "right";
};

const PlayerRoundInfo: FC<{ player: Player; placement: "left" | "right" }> = ({
  player,
  placement,
}) => {
  const balance = usePrevious<number>(player.balance);
  const hp = usePrevious<number>(player.hp);
  const { $t } = useIntl();

  const isDead = !(Number(player.hp) > 0);
  const weapon =
    player.inventory.find(isPrimary) || player.inventory.find(isSecondary);
  const utilities = player.inventory.filter(isUtility);
  const c4 = player.inventory.find(isC4);
  const kit = player.inventory.find(isKit);

  return (
    <div className={classNames("list-group-item p-0")} key={player.name}>
      <div className="position-relative text-white">
        <div
          className="bottom-0 border-0 end-0 position-absolute start-0 top-0"
          style={{
            background: getColorByTeamNumber(player.team),
            width: `${player.hp}%`,
            transition: "width 0.2s",
          }}
        />
        <div
          className="bottom-0 border-0 end-0 position-absolute start-0 top-0"
          style={{
            background: getColorByTeamNumber(3, 0.05),
          }}
        />
        <div
          className={classNames(
            "align-items-center d-flex gap-2 justify-content-between position-relative py-1 px-2",
            {
              "text-danger": isDead,
              "flex-row-reverse": placement === "right",
            }
          )}
        >
          <div
            className={classNames("d-flex gap-2 align-items-center", {
              "flex-row-reverse": placement === "right",
            })}
          >
            <div
              className="align-items-center d-flex justify-content-center text-center"
              style={{ width: 35 }}
            >
              {isDead ? (
                <svg width={16} height={16} fill="currentColor">
                  <path d="M1.095 9.2C1.272 9.168-.21.085 7.69.003V0h.621v.002c7.9.082 6.417 9.165 6.594 9.199.177.033 1.084.552.243 1.161-.697.504-.558 1.071-1.012 1.917-.453.845-1.419.288-2.366.608-.946.322-.236 1.458-.808 2.253-.547.761-2.772.868-2.962.86-.19.008-2.415-.099-2.962-.86-.572-.795.138-1.931-.808-2.253-.947-.32-1.913.237-2.366-.608-.454-.846-.315-1.412-1.012-1.917-.84-.609.066-1.128.243-1.161zm7.729.305c.218 1.39 2.983.857 3.522.474.583-.416.583-2.39-.315-2.526-.897-.135-3.342 1.195-3.207 2.052zm-.97 3.157c.076-.083.12-.21.146-.35.026.14.07.267.145.35.163.178.662-.057.673-.778.012-.722-.816-1.477-.816-1.477s-.831.755-.82 1.477c.01.721.51.956.673.778zm-4.34-2.683c.538.383 3.304.916 3.522-.474.135-.857-2.31-2.187-3.208-2.052-.897.135-.897 2.11-.314 2.526z" />
                </svg>
              ) : (
                <AnimatedNumber
                  start={hp?.prev}
                  end={hp?.current}
                  duration={0.3}
                />
              )}
            </div>
            <div className="fs-14">{player.name}</div>
          </div>
          {isDead ? (
            <div>{$t({ id: "common.Dead" })}</div>
          ) : (
            <div
              className="d-flex gap-1 align-items-center"
              style={{
                transform: placement === "right" ? "scale(-1,1)" : "scale(1)",
              }}
            >
              {weapon && <Weapon size={20} name={weapon} />}
            </div>
          )}
        </div>
      </div>
      <div className="d-flex px-2 py-1 align-items-center gap-2">
        <div className="w-100">
          <div
            className={classNames(
              "d-flex align-items-center justify-content-between gap-2",
              {
                "flex-row-reverse": placement === "right",
              }
            )}
          >
            <div
              className={classNames("d-flex gap-2 align-items-center", {
                "flex-row-reverse": placement === "right",
              })}
            >
              <div style={{ width: 35 }} className="text-center">
                {c4 && <Weapon size={20} name="c4" />}
                {kit && <Weapon size={16} name="kit" />}
              </div>
              <div
                className={classNames("fs-14 d-flex gap-2 align-items-center", {
                  "flex-row-reverse": placement === "right",
                })}
              >
                <div className="d-flex gap-1 align-items-center">
                  <i className="mdi mdi-skull" />
                  {player.deaths}
                </div>

                <div className="d-flex gap-1 align-items-center">
                  <i className="mdi mdi-handshake" />
                  {player.assists}
                </div>
                <div className="d-flex gap-1 align-items-center">
                  <i className="mdi mdi-crosshairs-gps" />
                  {player.kills}
                </div>
              </div>
            </div>
            <div
              className={classNames("d-flex align-items-center gap-1", {
                "flex-row-reverse": placement === "right",
              })}
            >
              {utilities.map((name) => (
                <Weapon key={name} size={20} name={name} />
              ))}
            </div>
            <div className="fs-14">
              <AnimatedNumber
                start={balance?.prev}
                end={balance?.current}
                suffix=" $"
                duration={0.3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Team: FC<TeamProps> = ({ team, placement }) => {
  const { $t } = useIntl();
  return (
    <div className="overflow-hidden rounded-2" style={{ marginTop: "-50%" }}>
      <div style={{ width: 300 }}>
        <div
          className={classNames(
            "px-2 d-flex bg-dark align-items-center justify-content-between",
            {
              "flex-row-reverse": placement === "right",
            }
          )}
        >
          <div
            className={classNames({
              "text-end": placement === "right",
            })}
          >
            <div className="fs-5">{$t({ id: "common.Team" })}</div>
            <div style={{ color: getColorByTeamNumber(team.team_number) }}>
              {team.team_number === 3 ? "Counter-Terrorists" : "Terrorists"}
            </div>
          </div>
          <div className="fs-1">{team.score}</div>
        </div>
        <div className="list-group list-group-flush">
          {team.players.map((player) => (
            <PlayerRoundInfo
              key={player.steamid}
              player={player}
              placement={placement}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
