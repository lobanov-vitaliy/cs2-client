"use client";

import classNames from "classnames";
import { FC } from "react";

const items = [
  {
    title: "Overall",
    type: 0,
  },
  {
    title: "CT Side",
    type: 3,
  },
  {
    title: "T Side",
    type: 2,
  },
];

const SideSwicher: FC<{ value: number; onChange: (value: number) => void }> = ({
  value,
  onChange,
}) => {
  return (
    <ul className="nav nav-pills card-header-pills mb-1 navbar-toggler nav-dark">
      {items.map(({ title, type }) => (
        <li className="nav-item" key={type}>
          <span
            onClick={() => {
              onChange(type);
            }}
            className={classNames("nav-link", {
              active: value === type,
              "cursor-pointer": value !== type,
            })}
          >
            {title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SideSwicher;
