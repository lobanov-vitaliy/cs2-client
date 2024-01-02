"use client";

import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
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
import { createPortal } from "react-dom";

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

const Timeline: FC = () => {
  const { $t } = useIntl();
  const match = useMatch();
  const [type, setType] = useState("kills");
  const [data, setData] = useState<any>(null);

  const players = useMemo(() => {
    return match.teams.reduce(
      (players: any, team: any) => [...players, ...team.players],
      []
    );
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
        datasets: data.map((item: any) => {
          const player = players.find(
            (player: any) => player.steamid === item.steamid
          );
          return {
            label: item.steamid,
            data: Object.values(item.rounds),
            borderWidth: 1.5,
            borderColor: TEAM_PLAYER_COLOR[player.player_color],
            backgroundColor: TEAM_PLAYER_COLOR[player.player_color],
            pointStyle: false,
          };
        }),
      });
    };

    fetchData();
  }, [match, type, players]);

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
          {match.teams.map((team: any, i: number) => (
            <Card key={team.id}>
              <div className="table-responsive">
                <table className="table table-nowrap table-sm align-middle table-striped caption-top table-borderless mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>
                        <span>{team.name || "Team " + (i ? "B" : "A")}</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.players.map((player: any) => {
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
                                  border: `2px solid ${
                                    TEAM_PLAYER_COLOR[player.player_color]
                                  }`,
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
