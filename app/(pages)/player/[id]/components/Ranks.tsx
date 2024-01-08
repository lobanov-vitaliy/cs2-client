"use client";

import { FC, useMemo, useState } from "react";
import Card from "@/app/components/Card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import classNames from "classnames";
import { useIntl } from "react-intl";
import { MATCH_MODE } from "@/app/consts";
import { RANK_TITLE } from "@/components/Rank";
import { format } from "date-fns";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  annotationPlugin
);
type RanksProps = {
  data: Array<{
    rank: number;
    datetime: string;
    mode: number;
  }>;
};

const items: any = {
  [MATCH_MODE.Premier]: "Premier",
  [MATCH_MODE.Competitive]: "Competitive",
  [MATCH_MODE.Wingman]: "Wingman",
};

const Ranks: FC<RanksProps> = ({ data }) => {
  const { $t } = useIntl();
  const [ranks, matches] = useMemo(() => {
    const ranks: Record<number, Record<string, number>> = {};
    const matches: Record<number, Record<string, number>> = {};
    data.forEach((item) => {
      if (item.mode) {
        if (!ranks[item.mode]) {
          ranks[item.mode] = {};
        }

        if (!matches[item.mode]) {
          matches[item.mode] = {};
        }

        if (item.rank) {
          ranks[item.mode][new Date(item.datetime).valueOf()] = item.rank;
        }
        const date = format(new Date(item.datetime), "yyyy-MM-dd");
        matches[item.mode][date] = (matches[item.mode][date] || 0) + 1;
      }
    });

    return [ranks, matches];
  }, [data]);

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
      <div className="row">
        <div className="col-12 col-lg-6">
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
                    tooltip: {
                      displayColors: false,
                      callbacks: {
                        label(tooltipItem) {
                          return `${$t({ id: "common.Rank" })}: ${
                            isPremier
                              ? tooltipItem.formattedValue
                              : RANK_TITLE[tooltipItem.formattedValue]
                          }`;
                        },
                      },
                    },
                    annotation: {
                      annotations: {
                        label1: {
                          type: "label",
                          xMin: 0.5,
                          xMax: 0.5,
                          display: Object.keys(ranks[type] || {}).length === 0,
                          color: "#878a99",
                          content: [`You don't have a rank yet`],
                        },
                      },
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
                      title: {
                        display: true,
                        text: $t({ id: "common.Rank" }),
                      },
                      border: {
                        display: false,
                      },
                      min: isPremier
                        ? min - (min % 1000)
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
                        callback: (value) => {
                          if (isPremier) {
                            return new Intl.NumberFormat("en-IN").format(
                              Number(value)
                            );
                          }
                          return RANK_TITLE[value];
                        },
                      },
                      grid: {
                        display: true,
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                }}
                data={{
                  labels: Object.keys(ranks[type] || {}).map((s) =>
                    format(new Date(Number(s)), "yyyy-MM-dd HH:mm")
                  ),
                  datasets: [
                    {
                      label: $t({ id: "common.Rank" }),
                      data: Object.values(ranks[type] || {}),
                      borderWidth: 2,
                      pointStyle: false,
                      fill: false,
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-lg-6">
          <Card>
            <Card.Body>
              <Bar
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

                    tooltip: {
                      displayColors: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      position: "left",
                      border: {
                        display: false,
                      },
                      ticks: {
                        stepSize: 1,
                      },
                      title: {
                        display: true,
                        text: $t({ id: "common.Matches" }),
                      },
                      grid: {
                        display: true,
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                }}
                data={{
                  labels: Object.keys(matches[type] || {}),
                  datasets: [
                    {
                      label: $t({ id: "common.Matches" }),
                      data: Object.values(matches[type] || {}),
                    },
                  ],
                }}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Ranks;
