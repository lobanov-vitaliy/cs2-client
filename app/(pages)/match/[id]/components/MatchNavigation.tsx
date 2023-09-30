"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { useIntl } from "react-intl";

const tabs = [
  {
    title: ($t: any, match: any) => (
      <div className="d-flex gap-1 align-items-center">
        <span>{$t({ id: "common.Scoreboard" })}</span>
        <span className="d-flex">
          <span
            className={classNames({
              "text-success": match.teams[0].result === "win",
              "text-danger": match.teams[0].result === "loss",
            })}
          >
            {match.teams[0].score}
          </span>
          <span>:</span>
          <span
            className={classNames({
              "text-success": match.teams[1].result === "win",
              "text-danger": match.teams[1].result === "loss",
            })}
          >
            {match.teams[1].score}
          </span>
        </span>
      </div>
    ),
    path: "",
  },
  {
    title: ($t: any, match: any) => $t({ id: "common.Timeline" }),
    path: "/timeline",
  },
  {
    title: ($t: any, match: any) => $t({ id: "common.Clutches" }),
    path: "/clutches",
  },
  {
    title: ($t: any, match: any) => $t({ id: "common.Utility" }),
    path: "/utility",
  },
  {
    title: ($t: any, match: any) => $t({ id: "common.Activity" }),
    path: "/activity",
  },
  {
    title: ($t: any, match: any) => $t({ id: "common.Opening Duels" }),
    path: "/opening-duels",
  },
];

const MatchNavigation: FC<{ match: any }> = ({ match }) => {
  const pathname = usePathname();
  const { $t } = useIntl();
  return (
    <ul className="border-bottom-0 nav nav-custom-light nav-light nav-tabs-custom">
      {tabs.map(({ path, title }) => {
        const url = `/match/${match.match_id}${path}`;
        return (
          <li className="nav-item" key={path}>
            <Link
              className={classNames("nav-link", {
                active: url === pathname,
              })}
              href={url}
            >
              {title($t, match)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MatchNavigation;
