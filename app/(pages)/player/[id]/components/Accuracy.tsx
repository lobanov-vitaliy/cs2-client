"use client";

import { FC } from "react";
import Card from "@/app/components/Card";
import { sum } from "@/app/utils/number";
import StatsOverviewChart from "./StatsOverviewChart";
import { useIntl } from "react-intl";

type AccuracyProps = {
  data: {
    chest: number;
    stomac: number;
    leg: number;
    head: number;
  };
};

const colors = ["#42D189", "#00A763", "#007E3E", "#00571C", "#003300"];

const getColor = (percent: number) => {
  var index = Math.floor(percent / 20);

  return colors[index];
};

const Accuracy: FC<AccuracyProps> = ({ data }) => {
  const { $t } = useIntl();

  const total = sum(Object.values(data));
  return (
    <div className="align-items-center d-flex gap-4 h-100 justify-content-evenly p-2">
      <div style={{ width: 60 }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.77 79.999">
          <g transform="translate(-287.877 -471)">
            <path
              d="M17.932,42.727,17.9,36.532,16.088,21.445,12.675,6.7,18.836,0,20.77,4.647l.9,19.364V36.157l1.86,6.569ZM0,42.727l1.861-6.569V24.012l.9-19.364L4.7,0l6.162,6.7L7.447,21.445,5.637,36.532,5.6,42.727Z"
              transform="translate(291.493 508.272)"
              fill={getColor((data.leg / total) * 100)}
            ></path>
            <path
              d="M.95-.091,4.064-1l3.211.909.452,5.462L5.468,9H2.757L.487,5.483Z"
              transform="translate(299.154 472)"
              fill={getColor((data.head / total) * 100)}
            ></path>
            <path
              d="M19102.863,18675.613h0l-6.334-7.27-.352-7.291,1.459,1h10.316l1.6-1.041-.355,7.334-6.336,7.27Z"
              transform="translate(-18799.605 -18162.797)"
              fill={getColor((data.stomac / total) * 100)}
            ></path>
            <path
              d="M19088.781,18674.635h0l-3.9-2.533.9-5.59v-9.262l2.223-10.178,6.643-5.191,5.615-.879,5.619.879,6.643,5.191,2.219,10.178v9.262l.908,5.59-3.9,2.531,0-8.627-2.262-10.238-2.26-5-.135,2.781-2.422,1.578h-8.92l-2.311-1.582-.133-2.777-2.254,5-2.26,10.238,0,8.629Z"
              transform="translate(-18796.998 -18158.18)"
              fill={getColor((data.chest / total) * 100)}
            ></path>
          </g>
        </svg>
      </div>

      <table>
        <tbody>
          <tr>
            <td className="text-muted pe-2">Head:</td>
            <td className="pe-2 text-center">
              {Number((data.head / total) * 100).toFixed(1)}%
            </td>
            <td className="text-center">{data.head} Hits</td>
          </tr>
          <tr>
            <td className="text-muted pe-2">Chest / Arms:</td>
            <td className="pe-2 text-center">
              {Number((data.chest / total) * 100).toFixed(1)}%
            </td>
            <td className="text-center">{data.chest} Hits</td>
          </tr>
          <tr>
            <td className="text-muted pe-2">Stomach:</td>
            <td className="pe-2 text-center">
              {Number((data.stomac / total) * 100).toFixed(1)}%
            </td>
            <td className="text-center">{data.stomac} Hits</td>
          </tr>
          <tr>
            <td className="text-muted pe-2">Legs:</td>
            <td className="pe-2 text-center">
              {Number((data.leg / total) * 100).toFixed(1)}%
            </td>
            <td className="text-center">{data.leg} Hits</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Accuracy;
