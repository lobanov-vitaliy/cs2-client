import React, { useMemo } from "react";
import cn from "classnames";
import classNames from "classnames";

export type Props = {
  total?: number;
  page?: number;
  pageCount?: number;
  className?: string;
  onChange?: (page: number) => void;
};

const Pagination: React.FC<Props> = ({
  total = 1,
  page = 1,
  pageCount = 5,
  onChange,
  className,
}) => {
  const count = Math.ceil(total / pageCount);
  const navigation = useMemo(() => {
    let left: Array<number> = [];
    let center: Array<number> = [];
    let right: Array<number> = [];

    if (count <= 5) {
      left = Array.from({ length: count }, (_, i) => i + 1);
    } else {
      left = page > 3 ? [1] : [1, 2, 3, 4];
      right =
        page + 2 >= count
          ? Array.from({ length: 5 }, (_, i) => count - i).reverse()
          : [count];
      center =
        left.length !== 1 || right.length > 1
          ? [0]
          : [0, page - 1, page, page + 1, 0];
    }
    return [...left, ...center, ...right];
  }, [page, count]);

  const changePage = (page: number): void => {
    if (page && typeof onChange === "function") {
      onChange(page);
    }
  };

  return (
    <>
      <ul
        className={classNames(
          "pagination pagination-sm pagination-separated mb-0",
          className
        )}
      >
        <li
          onClick={(): void => {
            if (page !== 1) {
              changePage(page - 1);
            }
          }}
          className={classNames("page-item", {
            disabled: page === 1,
            "cursor-pointer": page !== 1,
          })}
        >
          <span className="page-link">Previous</span>
        </li>

        {navigation.map((value, index) => {
          if (!value || value === page) {
            return (
              <li
                onClick={(): void => changePage(value)}
                key={index}
                className={classNames("page-item", {
                  active: value,
                  "cursor-pointer": Boolean(value),
                })}
              >
                <span className="page-link">{value || "..."}</span>
              </li>
            );
          }

          return (
            <li
              key={index}
              onClick={(): void => changePage(value)}
              className="page-item cursor-pointer"
            >
              <span className="page-link">{value}</span>
            </li>
          );
        })}

        <li
          onClick={(): void => {
            if (page !== count) {
              changePage(page + 1);
            }
          }}
          className={classNames("page-item", {
            disabled: page === count,
            "cursor-pointer": page !== count,
          })}
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
