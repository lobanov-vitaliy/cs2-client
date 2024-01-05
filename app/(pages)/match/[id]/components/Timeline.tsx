"use client";

import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import classNames from "classnames";
import { FC, useEffect, useMemo, useState } from "react";
import React from "react";
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
import Link from "next/link";
import { useMatch } from "../context";
import { MatchRank } from "@/components/Rank";
import { useIntl } from "react-intl";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  annotationPlugin
);

const COLORS = [
  "#16d620",
  "#b91383",
  "#f4359e",
  "#9c5935",
  "#a9c413",
  "#2a778d",
  "#668d1c",
  "#bea413",
  "#0c5922",
  "#743411",
];

const getOrCreateTooltip = (chart: any) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "bg-light";
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.transition = "all .1s ease";

    const table = document.createElement("table");
    table.setAttribute("cellspacing", "0");
    table.setAttribute("cellpadding", "0");
    table.style.margin = "0px";

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

type TimelineProps = {
  rounds: Array<{
    round_number: number;
    winner_team_number: number;
    reason: number;
    teams: Array<{
      id: string;
      team_number: number;
      count: number;
      survived: number;
      score: number;
    }>;
  }>;
};

const items = [
  {
    title: "Kills",
    value: "kills",
  },
  {
    title: "Deaths",
    value: "deaths",
  },
  {
    title: "AWP Kills",
    value: "awp_kills",
  },
  {
    title: "Pistol Kills",
    value: "pistol_kills",
  },
  {
    title: "Enemies Flashed",
    value: "enemies_flashed",
  },
  {
    title: "Utility Damage",
    value: "utility_damage",
  },
  {
    title: "Clutches",
    value: "clutches",
  },
  {
    title: "Headshots",
    value: "headshots",
  },
  {
    title: "Damage",
    value: "damage",
  },
];

const Timeline: FC<TimelineProps> = ({ rounds }) => {
  const { $t } = useIntl();
  const match = useMatch();
  const [type, setType] = useState("kills");
  const [data, setData] = useState<any>(null);

  const swapRounds = useMemo(() => {
    return rounds.filter((round, i) => {
      return (
        rounds[i + 1] &&
        round.teams[0].team_number !== rounds[i + 1].teams[0].team_number
      );
    });
  }, [rounds]);

  const players = useMemo(() => {
    return match.teams
      .reduce(
        (players: any, team: any) => [
          ...players,
          ...team.players.map((player: any) => ({
            ...player,
            result: team.result,
          })),
        ],
        []
      )
      .map((player: any, i: number) => ({ ...player, color: COLORS[i] }));
  }, [match]);

  useEffect(() => {
    const fetchData = async () => {
      let params: Record<string, string> = {
        type,
      };

      const response = await fetch(
        `/api/matches/${match.match_id}/timeline?${new URLSearchParams(params)}`
      );
      const data = await response.json();

      setData({
        labels: Object.keys(data[0].rounds),
        datasets: data.map((item: any, i: number) => {
          const player = players.find(
            (player: any) => player.steamid === item.steamid
          );
          return {
            label: player.steamid,
            data: Object.values(item.rounds),
            borderWidth: 1.5,
            borderColor: player.color,
            backgroundColor: player.color,
            pointStyle: false,
          };
        }),
      });
    };

    fetchData();
  }, [match, type, players]);

  const externalTooltipHandler = (context: any) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];

      const bodyLines = tooltip.body.map((b: any) => b.lines);

      const tableHead = document.createElement("thead");

      titleLines.forEach((title: string) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.style.borderWidth = "0px";
        const div = document.createElement("div");
        div.className =
          "d-flex justify-content-between align-items-center py-1 px-2";

        const text = document.createElement("div");
        text.innerText = `${$t({ id: "common.Round" })} #${title}`;

        const value = document.createElement("div");
        value.innerText = $t({
          id: `common.${items.find(({ value }) => value === type)?.title}`,
        });

        div.appendChild(text);
        div.appendChild(value);
        th.appendChild(div);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement("tbody");
      bodyLines
        .map((body: any) => {
          const [steamid, value] = body
            .shift()
            .split(":")
            .map((s: string) => s.trim());

          return {
            steamid,
            value,
          };
        })
        .sort((a: any, b: any) => b.value - a.value)
        .forEach((data: any, i: number) => {
          const tr = document.createElement("tr");
          tr.style.backgroundColor = "inherit";
          tr.style.borderWidth = "0px";

          const td = document.createElement("td");
          td.style.borderWidth = "0px";

          const player = players.find(
            (player: any) => player.steamid === data.steamid
          );

          const div = document.createElement("div");
          div.style.marginTop = "2px";
          div.style.borderLeft = `5px ${player.color} solid`;
          div.className =
            "d-flex bg-opacity-50 justify-content-between align-items-center py-1 px-2";
          if (player.result === "win") {
            div.className += " bg-success";
          } else if (player.result === "loss") {
            div.className += " bg-danger";
          } else {
            div.className += " bg-primary";
          }

          const value = document.createElement("div");
          const point = tooltip.dataPoints.find(
            ({ dataset }: any) => dataset.label === player.steamid
          );
          const prev = point.dataset.data[point.dataIndex - 1];
          value.innerText = `${data.value} ${
            data.value - prev > 0 ? `(+${data.value - prev})` : ""
          }`;

          const user = document.createElement("div");
          user.className = "d-flex gap-2 align-items-center";

          const avatar = document.createElement("img");
          avatar.className = "rounded-1 avatar-xs";
          avatar.alt = "avatar";
          avatar.src = player.avatar;

          const name = document.createElement("span");
          name.innerText = player.name;

          user.appendChild(avatar);
          user.appendChild(name);
          div.appendChild(user);
          div.appendChild(value);

          td.appendChild(div);
          tr.appendChild(td);
          tableBody.appendChild(tr);
        });

      const tableRoot = tooltipEl.querySelector("table");
      tableRoot.style.width = "100%";
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, width, height } = chart.canvas;

    let left = positionX + tooltip.caretX;
    if (left + 300 > width) {
      left = left - 300 - 20;
    } else {
      left = left + 20;
    }

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.width = "300px";
    tooltipEl.style.left = left + "px";
    tooltipEl.style.top = (height - tooltipEl.offsetHeight) / 2 + "px";
    tooltipEl.style.font = tooltip.options.bodyFont.string;
  };

  return (
    <>
      <ul className="nav nav-pills card-header-pills mb-1 navbar-toggler nav-dark">
        {items.map(({ title, value }) => (
          <li className="nav-item" key={value} onClick={() => setType(value)}>
            <span
              className={classNames("nav-link", {
                active: value === type,
                "cursor-pointer": value !== type,
              })}
            >
              {$t({ id: `common.${title}` })}
            </span>
          </li>
        ))}
      </ul>
      <div className="row">
        <div className="col-3">
          {match.teams.map((team: any, index: number) => (
            <Card key={team.id}>
              <div className="table-responsive">
                <table className="table table-nowrap table-sm align-middle table-striped caption-top table-borderless mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>
                        <span>
                          {team.name || "Team " + (index ? "B" : "A")}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.players
                      .map(({ steamid }: any) =>
                        players.find(
                          (player: any) => player.steamid === steamid
                        )
                      )
                      .map((player: any) => {
                        return (
                          <tr key={player.steamid}>
                            <td>
                              <Link
                                href={`/player/${player.steamid}`}
                                className="d-flex align-items-center d-flex justify-content-center  justify-content-md-start gap-2"
                              >
                                <Avatar
                                  src={player.avatar}
                                  size="xs"
                                  style={{
                                    border: `2px solid ${player.color}`,
                                  }}
                                />
                                <MatchRank value={player.rank} />
                                <h5 className="fs-13 mb-0 d-none d-md-block">
                                  {player.name}
                                </h5>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </Card>
          ))}
        </div>
        <div className="col-9">
          <Card className="card-height-100">
            <Card.Body>
              {data && (
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
                        enabled: false,
                        external: externalTooltipHandler,
                      },
                      annotation: {
                        annotations: swapRounds.reduce((data, round, i) => {
                          return {
                            ...data,
                            [`line${i + 1}`]: {
                              type: "line",
                              xMin: round.round_number - 0.5,
                              xMax: round.round_number - 0.5,
                              borderColor: "rgba(255,255,255,0.1)",
                              borderWidth: 1,
                              borderDash: [5, 5],
                            },
                          };
                        }, {}),
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
                      },
                      y: {
                        position: "right",
                        border: {
                          display: false,
                        },
                        grid: {
                          display: true,
                          color: "rgba(255,255,255,0.1)",
                        },
                      },
                    },
                  }}
                  data={data}
                />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Timeline;
