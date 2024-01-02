"use client";

import { FC, useState } from "react";
import Card from "@/app/components/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";
import classNames from "classnames";
import { useIntl } from "react-intl";
import { MATCH_MODE } from "@/app/consts";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors
);
type RanksProps = {
  ranks: Record<string, Record<number, number>>;
};

const items: any = {
  [MATCH_MODE.Premier]: "Premier",
  [MATCH_MODE.Competitive]: "Competitive",
  [MATCH_MODE.Wingman]: "Wingman",
};

const Ranks: FC<RanksProps> = ({ ranks }) => {
  const { $t } = useIntl();
  const [type, setType] = useState(
    Number(Object.keys(ranks).shift()) || MATCH_MODE.Competitive
  );

  const min = Math.min(...Object.values(ranks[type] || {}));
  const max = Math.max(...Object.values(ranks[type] || {}));
  const isPremier = Number(MATCH_MODE.Premier) === Number(type);

  return (
    <>
      <ul className="nav nav-pills card-header-pills mb-1 navbar-toggler nav-dark">
        {Object.keys(ranks).map((key: any) => (
          <li
            className="nav-item"
            key={key}
            onClick={() => setType(Number(key))}
          >
            <span
              className={classNames("nav-link", {
                active: Number(key) === type,
                "cursor-pointer": Number(key) !== type,
              })}
            >
              {$t({ id: `common.${items[key]}` })}
            </span>
          </li>
        ))}
      </ul>
      <Card>
        <Card.Body>
          <Line
            options={{
              responsive: true,
              maintainAspectRatio: false,
              interaction: {
                intersect: false,
                mode: "index",
              },
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
              },
              scales: {
                x: {
                  border: {
                    display: true,
                  },
                  grid: {
                    display: false,
                  },
                  display: false,
                },
                y: {
                  position: "left",
                  border: {
                    display: false,
                  },
                  min: isPremier
                    ? min - 1000 - (min % 1000)
                    : min - 2 < 0
                    ? 0
                    : min - 2,
                  max: isPremier
                    ? max + 1000 - (max % 1000)
                    : max + 2 > 18
                    ? 18
                    : max + 2,
                  ticks: {
                    stepSize: isPremier ? 500 : 1,
                  },
                  grid: {
                    display: true,
                    color: "rgba(255,255,255,0.1)",
                  },
                },
              },
            }}
            data={{
              labels: Object.keys(ranks[type] || {}).map((value) =>
                format(new Date(value), "yyyy-MM-dd HH:ii")
              ),
              datasets: [
                {
                  label: "rank",
                  data: Object.values(ranks[type] || {}),
                  borderWidth: 1.5,
                  pointStyle: false,
                  fill: false,
                },
              ],
            }}
          />
        </Card.Body>
      </Card>
    </>
  );
};

export default Ranks;
