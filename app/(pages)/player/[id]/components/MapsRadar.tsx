"use client";

import React, { FC } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import Card from "@/app/components/Card";
import { getMapTitle } from "@/app/utils/match";
import { useIntl } from "react-intl";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Legend);

type MapsRadarProps = {
  maps: Array<{
    map_name: string;
    matches: number;
    kills: number;
    assists: number;
    deaths: number;
    headshots: number;
    wins: number;
  }>;
};

const MapsRadar: FC<MapsRadarProps> = ({ maps }) => {
  const { $t } = useIntl();
  const max = Math.max(
    ...maps.map((map) => map.wins),
    ...maps.map((map) => map.matches - map.wins),
    ...maps.map((map) => map.matches)
  );
  return (
    <Card>
      <div style={{ height: 300 }} className="p-1">
        <Radar
          data={{
            labels: maps.map((map) => map.map_name),
            datasets: [
              {
                label: $t({ id: "common.Matches" }),
                data: maps.map((map) => map.matches + 1),
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.3)",
                borderWidth: 1,
                pointStyle: false,
              },
              {
                label: $t({ id: "common.Defeat" }),
                data: maps.map((map) => map.matches - map.wins + 1),
                backgroundColor: "rgba(237, 94, 94, 0.4)",
                borderColor: "rgba(237, 94, 94, 0.8)",
                borderWidth: 1,
                pointStyle: false,
              },
              {
                label: $t({ id: "common.Victory" }),
                data: maps.map((map) => map.wins + 1),
                backgroundColor: "rgba(19, 197, 107, 0.4)",
                borderColor: "rgba(19, 197, 107, 0.8)",
                borderWidth: 1,
                pointStyle: false,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            layout: {
              padding: 0,
            },
            plugins: {
              legend: {
                display: true,
              },
              title: {
                display: false,
              },
            },
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },

              r: {
                pointLabels: {
                  font: {
                    size: 14,
                  },
                  callback: (value) => {
                    return getMapTitle(value);
                  },
                },
                min: 0,
                max: max + 2,
                grid: {
                  color: "rgba(255,255,255,0.2)",
                },

                ticks: {
                  stepSize: 1,
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </Card>
  );
};

export default MapsRadar;
