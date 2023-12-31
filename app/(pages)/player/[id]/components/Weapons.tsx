import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Weapon from "@/app/(pages)/match/[id]/components/Weapon";
import getIntl from "@/components/providers/ServerIntlProvider/intl";

type WeaponsProps = {
  weapons: {
    topByKills: Array<{
      name: string;
      kills: number;
    }>;
    topByHeadshot: Array<{
      name: string;
      headshot: number;
      kills: number;
      hs: number;
    }>;
  };
};

const Weapons: FC<WeaponsProps> = async ({ weapons }) => {
  const { $t } = await getIntl();
  const maxKills = Math.max(...weapons.topByKills.map((data) => data.kills));
  return (
    <div className="row">
      <div className="col-12 col-lg-6">
        <Card className="card-height-100">
          <Card.Header className="fs-5 p-2">
            {$t({ id: "common.Most Kills" })}
          </Card.Header>
          <ul className="list-group list-group-flush">
            {weapons.topByKills.map((data) => (
              <li key={data.name} className="list-group-item p-2">
                <div className="align-items-center d-flex justify-content-between ">
                  <Weapon name={data.name} size={24} />
                  <div>{data.kills}</div>
                </div>

                <div className="progress progress-sm mt-1">
                  <div
                    className="progress-bar"
                    style={{ width: (data.kills / maxKills) * 100 + "%" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="col-12 col-lg-6">
        <Card className="card-height-100">
          <Card.Header className="fs-5 p-2">
            %{$t({ id: "common.HS" })}
          </Card.Header>
          <ul className="list-group list-group-flush">
            {weapons.topByHeadshot.map((data) => (
              <li key={data.name} className="list-group-item p-2">
                <div className="align-items-center d-flex justify-content-between">
                  <Weapon name={data.name} size={24} />
                  <div>{data.hs.toFixed(0)}%</div>
                </div>

                <div className="progress progress-sm mt-1">
                  <div
                    className="progress-bar"
                    style={{ width: data.hs + "%" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Weapons;
