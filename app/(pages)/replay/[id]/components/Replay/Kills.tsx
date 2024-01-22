import Weapon from "@/app/(pages)/match/[id]/components/Weapon";
import { getColorByTeamNumber } from "@/app/utils/team";
import { seconds2timestring } from "@/app/utils/time";
import { FC } from "react";

const Kills: FC<{
  items: Array<{
    seconds: number;
    is_attacker_blind?: boolean;
    is_noscope?: boolean;
    is_thrusmoke?: boolean;
    is_headshot?: boolean;
    is_penetrated?: boolean;
    victim?: {
      team: number;
      steamid: string;
      name: string;
    };
    attacker?: {
      team: number;
      steamid: string;
      name: string;
    };
    assister?: {
      team: number;
      steamid: string;
      name: string;
    };
    weapon: string;
  }>;
}> = ({ items }) => {
  return (
    <div className="list-group list-group-flush mt-1 align-items-end">
      {items.map((item) => (
        <div
          key={item.victim?.steamid}
          className="align-items-center d-flex gap-1 mt-1 list-group-item px-2 py-1"
        >
          <div className="text-center" style={{ width: 40 }}>
            {seconds2timestring(item.seconds)}
          </div>
          {item.is_attacker_blind && (
            <div>
              <img
                height={16}
                alt="shooter blind"
                src={
                  "https://www.hltv.org/img/static/scoreboard/weapons/shooter_blind.png"
                }
              />
            </div>
          )}
          <div className="align-items-center d-flex gap-1">
            {item.attacker && (
              <div
                className="text-nowrap"
                style={{
                  color: getColorByTeamNumber(item.attacker.team),
                }}
              >
                {item.attacker.name}
              </div>
            )}
            {item.assister && (
              <>
                <i className="mdi mdi-plus" />
                <div
                  className="text-nowrap"
                  style={{
                    color: getColorByTeamNumber(item.assister.team),
                  }}
                >
                  {item.assister.name}
                </div>
              </>
            )}
          </div>
          <div>
            {item.weapon === "world" ? (
              <span>suicide</span>
            ) : item.weapon === "planted_c4" ? (
              <svg
                height={20}
                fill="rgb(176, 158, 107)"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 581.5 532.9"
              >
                <polygon points="318.8,5 328,184.6 425.4,108.5 385.3,239 543.7,209 425.4,313.1 549.8,326.3 434.3,394.3 574.2,527.8   387.9,430.3 394.5,494.8 312.7,436.9 294.5,482.1 244.7,436.9 183.3,523.2 179.7,405 16.8,425.8 143.7,349.6 66.5,322.2   135.6,286.2 7.2,173.5 178.2,238.5 177.2,125.3 244.7,199.9 " />
              </svg>
            ) : (
              <Weapon name={item.weapon} size={20} />
            )}
          </div>
          {item.is_noscope && (
            <div>
              <img
                height={16}
                alt="noscope"
                src={
                  "https://www.hltv.org/img/static/scoreboard/weapons/noscope.png"
                }
              />
            </div>
          )}
          {item?.is_thrusmoke && (
            <div>
              <img
                height={16}
                alt="through smoke"
                src={
                  "https://www.hltv.org/img/static/scoreboard/weapons/through_smoke.png"
                }
              />
            </div>
          )}
          {item?.is_penetrated && (
            <div>
              <img
                height={16}
                alt="penetration"
                src={
                  "https://www.hltv.org/img/static/scoreboard/weapons/penetration.png"
                }
              />
            </div>
          )}
          {item?.is_headshot && (
            <div>
              <img
                height={16}
                alt="headshot"
                src={
                  "https://www.hltv.org/img/static/scoreboard/weapons/headshot.png"
                }
              />
            </div>
          )}
          {item.weapon !== "world" && item.victim && (
            <div
              className="text-nowrap"
              style={{
                color: getColorByTeamNumber(item.victim.team),
              }}
            >
              {item.victim?.name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Kills;
