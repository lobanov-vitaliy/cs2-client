"use client";

import { FC } from "react";
import Card from "@/app/components/Card";
import Weapon from "@/app/(pages)/match/[id]/components/Weapon";
import Table from "@/components/Table";
import { useIntl } from "react-intl";
import Accuracy from "./Accuracy";

type WeaponsProps = {
  weapons: {
    accuracy: {
      chest: number;
      stomac: number;
      leg: number;
      head: number;
    };
    topByGroup: Array<{
      kills: number;
      headshot: number;
      group: string;
      hs: number;
    }>;
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

const Weapons: FC<WeaponsProps> = ({ weapons }) => {
  const { $t } = useIntl();
  const maxKills = Math.max(...weapons.topByKills.map((data) => data.kills));

  return (
    <div className="row">
      <div className="col-12 col-lg-3">
        <Card className="card-height-100">
          <Card.Header className="p-2">
            {$t({ id: "common.Accuracy" })}
          </Card.Header>
          <Accuracy data={weapons.accuracy} />
        </Card>
      </div>
      <div className="col-12 col-lg-3">
        <Card className="card-height-100">
          <Card.Header className="p-2">
            {$t({ id: "common.By Types" })}
          </Card.Header>
          <Table
            size="md"
            data={weapons.topByGroup}
            columns={[
              {
                id: "group",
                Header: $t({ id: "common.Type" }),
                Cell: (row) => $t({ id: `weapon.group.${row.group}` }),
              },
              {
                id: "kills",
                Header: $t({ id: "common.Kills" }),
                options: {
                  align: "center",
                  width: 100,
                },
                Cell: (row) => row.kills,
              },
              {
                id: "kd",
                Header: $t({ id: "common.K/D" }),
                options: {
                  align: "center",
                  width: 100,
                },
                Cell: (row) => row.kd || 0,
              },
              {
                id: "hs",
                Header: `%${$t({ id: "common.HS" })}`,
                options: {
                  align: "center",
                  width: 100,
                },
                Cell: (row) => `${Number(row.hs).toFixed(1)}%`,
              },
            ]}
          />
        </Card>
      </div>
      <div className="col-12 col-lg-3">
        <Card className="card-height-100">
          <Card.Header className="p-2">
            {$t({ id: "common.Most Kills" })}
          </Card.Header>
          <ul className="list-group list-group-flush">
            {weapons.topByKills.map((data) => (
              <li key={data.name} className="list-group-item px-1 py-2">
                <div className="align-items-center d-flex justify-content-between ">
                  <Weapon name={data.name} size={22} />
                  <div>{data.kills}</div>
                </div>

                <div className="progress progress-sm mt-2">
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
      <div className="col-12 col-lg-3">
        <Card className="card-height-100">
          <Card.Header className="p-2">%{$t({ id: "common.HS" })}</Card.Header>
          <ul className="list-group list-group-flush">
            {weapons.topByHeadshot.map((data) => (
              <li key={data.name} className="list-group-item px-1 py-2">
                <div className="align-items-center d-flex justify-content-between">
                  <Weapon name={data.name} size={22} />
                  <div>{data.hs.toFixed(0)}%</div>
                </div>

                <div className="progress progress-sm mt-2">
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
