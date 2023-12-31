"use client";

import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import Rank from "@/app/components/Rank";
import Table from "@/app/components/Table";
import classNames from "classnames";
import Link from "next/link";

const Leaderboards = ({ data }: any) => {
  let number = 1;
  return (
    <Card>
      <Table
        data={data.data}
        columns={[
          {
            id: "number",
            Header: "#",
            options: {
              align: "center",
              width: 50,
            },
            Cell: (row) => number++,
          },
          {
            id: "name",
            Header: "Player",
            Cell: (row: any) => (
              <Link
                href={`/player/${row.steamid}`}
                className="d-flex align-items-center d-flex justify-content-center  justify-content-md-start gap-2"
              >
                <Avatar src={row.avatar} size="xs" />
                <h5 className="fs-13 mb-0 d-none d-md-block">{row.name}</h5>
              </Link>
            ),
          },
          {
            id: "matches",
            Header: "Matches",
            options: {
              align: "center",
              width: 150,
            },
            Cell: (row) => row.matches,
          },
          {
            id: "kills",
            Header: "Kills",
            options: {
              align: "center",
              width: 150,
            },
            Cell: (row) => row.kills,
          },
          {
            id: "assists",
            Header: "Assists",
            options: {
              align: "center",
              width: 150,
            },
            Cell: (row) => row.assists,
          },
          {
            id: "deaths",
            Header: "Deaths",
            options: {
              align: "center",
              width: 150,
            },
            Cell: (row) => row.deaths,
          },
          {
            id: "kd",
            Header: "K/D",
            options: {
              align: "center",
              width: 150,
            },

            Cell: (row) => {
              const kd = +Number(row.kills / row.deaths).toFixed(2);
              return (
                <span
                  className={classNames("text-center", {
                    "text-success": kd >= 1,
                    "text-danger": kd < 1,
                  })}
                >
                  {kd}
                </span>
              );
            },
          },
          {
            id: "headshots",
            Header: "%HS",
            options: {
              align: "center",
              width: 150,
            },
            Cell: (row) =>
              `${Number((row.headshots / row.kills) * 100).toFixed(1)}%`,
          },
          {
            id: "wins",
            Header: "Winrate",
            options: {
              align: "center",
              width: 150,
              sorting: true,
            },
            Cell: (row) =>
              `${Number((row.wins / row.matches) * 100).toFixed(1)}%`,
          },
        ]}
      />
    </Card>
  );
};

export default Leaderboards;
