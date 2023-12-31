"use client";

import { FC } from "react";
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
import { Scatter } from "react-chartjs-2";
import { useIntl } from "react-intl";
import { useMatch } from "../../context";
import { sum } from "@/app/utils/number";
import Card from "@/components/Card";

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

type ExplosivesRoundsProps = {
  rounds: Array<{
    status:
      | "bomb_defused"
      | "bomb_exploded"
      | "bomb_saved"
      | "bomb_planted_after_round_end"
      | "bomb_planted_and_kill_ct";
    round_number: number;
    round_end_second: number;
    planted_place_name: "A" | "B";
    planted_second: number;
    planted_steamid: string;
    defused_steamid?: string;
    defused_second?: number;
    defused_has_defuser?: boolean;
  }>;
};

const ExplosivesRounds: FC<ExplosivesRoundsProps> = ({ rounds }) => {
  const { $t } = useIntl();
  const match = useMatch();
  const labels = [
    ...new Array(sum(match.teams.map((team: any) => team.score))),
  ].map((_, i: number) => i + 1);

  return (
    <Card className="p-1">
      <div style={{ height: 150 }}>
        <Scatter
          options={{
            responsive: true,
            maintainAspectRatio: false,

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
                  display: false,
                  dash: [5, 5],
                },
                grid: {
                  display: true,
                  color: "rgba(255,255,255,0.1)",
                },
                ticks: {
                  stepSize: 1,
                  maxRotation: 180,
                  callback(tickValue) {
                    return `${$t({ id: "common.Round" })} ${tickValue}`;
                  },
                },
              },
              y: {
                min: -2,
                max: 2,
                border: {
                  display: false,
                },
                grid: {
                  display: true,
                  color: "rgba(255,255,255,0.04)",
                },
                ticks: {
                  stepSize: 1,
                  maxRotation: 180,
                  callback(tickValue) {
                    if (tickValue === -1) {
                      return $t({ id: "common.Side" }) + " B";
                    }
                    if (tickValue === 1) {
                      return $t({ id: "common.Side" }) + " A";
                    }

                    if (tickValue === 0) {
                      return $t({ id: "common.Not planted" });
                    }
                    return null;
                  },
                },
              },
            },
          }}
          data={{
            labels: [
              ...new Array(sum(match.teams.map((team: any) => team.score))),
            ].map((_, i: number) => i + 1),
            datasets: [
              {
                data: labels.map((number) => {
                  const round = rounds.find(
                    (round) => round.round_number === number
                  );
                  if (round && round.status === "bomb_defused") {
                    return round.planted_place_name === "A" ? 1 : -1;
                  }

                  return null;
                }),
                pointStyle: function () {
                  var img = new Image(24, 24);
                  img.src = "/assets/icons/defuse.svg";
                  return img;
                },
              },
              {
                data: labels.map((number) => {
                  const round = rounds.find(
                    (round) => round.round_number === number
                  );
                  if (
                    round &&
                    [
                      "bomb_planted_and_kill_ct",
                      "bomb_planted_after_round_end",
                      "bomb_exploded",
                    ].includes(round.status)
                  ) {
                    return round.planted_place_name === "A" ? 1 : -1;
                  }

                  return null;
                }),
                pointStyle: function () {
                  var img = new Image(22, 22);
                  img.src = "/assets/icons/bombed.svg";
                  return img;
                },
              },
              {
                data: labels.map((number) => {
                  const round = rounds.find(
                    (round) => round.round_number === number
                  );

                  return !round || round.status === "bomb_saved" ? 0 : null;
                }),
                pointRadius: 8,
                pointHoverRadius: 8,
                borderColor: "#ffffff",
              },
            ] as any,
          }}
        />
      </div>
    </Card>
  );
};

export default ExplosivesRounds;
