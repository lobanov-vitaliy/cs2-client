"use client";

import classNames from "classnames";
import { FC } from "react";
import { useIntl } from "react-intl";

const items = [
  {
    title: "common.Overall",
    type: 0,
  },
  {
    title: "common.CT Side",
    type: 3,
  },
  {
    title: "common.T Side",
    type: 2,
  },
];

const SideSwicher: FC<{ value: number; onChange: (value: number) => void }> = ({
  value,
  onChange,
}) => {
  const { $t } = useIntl();

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
            {$t({ id: title })}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SideSwicher;
