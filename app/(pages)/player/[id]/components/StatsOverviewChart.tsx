"use client";

import { FC } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Colors,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Colors
);

const StatsOverviewChart: FC<{ labels: string[]; values: number[] }> = ({
  labels: l,
  values: v,
}) => {
  const labels = ["-1", ...l];
  const values = [0, ...v];
  const isPositive = values[values.length - 1] >= values[values.length - 2];

  if (values.every((value) => value === 0)) {
    return null;
  }
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 0,
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
            display: false,
          },
          y: {
            display: false,
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: "line",
            data: values,
            borderWidth: 1,
            borderColor: isPositive ? "rgb(19, 197, 107)" : "rgb(237, 94, 94)",
            backgroundColor: (context) => {
              const { ctx, chartArea: { top = 0, bottom = 0 } = {} } =
                context.chart;
              const gradient = ctx.createLinearGradient(0, top, 0, bottom);

              gradient.addColorStop(
                0,
                isPositive
                  ? "rgba(19, 197, 107, 0.5)"
                  : "rgba(237, 94, 94, 0.5)"
              );
              gradient.addColorStop(
                1,
                isPositive ? "rgba(19, 197, 107, 0)" : "rgba(237, 94, 94, 0)"
              );
              return gradient;
            },
            tension: 0.6,
            fill: true,
            pointStyle: false,
          },
        ],
      }}
    />
  );
};

export default StatsOverviewChart;
