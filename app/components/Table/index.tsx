"use client";
import classNames from "classnames";
import { FC } from "react";

export type TypeColumn = {
  id: string;
  options?: {
    align?: "left" | "right" | "center";
    width?: number;
    loading?: boolean;
    sorting?: boolean;
    visible?: boolean;
  };
  Header: React.ReactNode;
  Cell: (row: any) => React.ReactNode;
};

type TypeSort = {
  type: string;
  field: string;
};

type TableProps = {
  loading?: boolean;
  bordered?: boolean;
  striped?: boolean;
  size?: "sm" | "md";
  sort?: TypeSort;
  onSort?: (sort: TypeSort) => void;
  columns: Array<TypeColumn>;
  data: Array<any>;
};

const getColumnClassNames = (column: TypeColumn) => {
  return classNames({
    "text-center": column.options?.align === "center",
    "text-right": column.options?.align === "right",
  });
};

const getColumnStyle = (column: TypeColumn) => {
  const style: React.CSSProperties = {};

  if (column.options?.width) {
    style.width = column.options?.width;
  }

  return style;
};

const Table: FC<TableProps> = ({
  columns,
  data,
  sort,
  size = "sm",
  loading = false,
  bordered = false,
  striped = true,
  onSort,
}) => {
  return (
    <div className="table-responsive">
      <table
        className={classNames(
          "table table-nowrap  align-middle caption-top table-borderless mb-0",
          {
            "table-bordered": bordered,
            "table-striped": striped,
            "table-sm": size === "sm",
          }
        )}
      >
        <thead className="table-light">
          <tr>
            {columns
              .filter((column) => column.options?.visible !== false)
              .map((column) => (
                <th
                  key={column.id}
                  className={classNames(getColumnClassNames(column), {
                    "cursor-pointer": column.options?.sorting,
                  })}
                  style={getColumnStyle(column)}
                  onClick={() => {
                    if (column.options?.sorting && onSort) {
                      onSort({
                        type:
                          column.id === sort?.field
                            ? sort?.type === "desc"
                              ? "asc"
                              : "desc"
                            : "asc",
                        field: column.id,
                      });
                    }
                  }}
                >
                  {column.options?.sorting ? (
                    <div className="d-inline-flex align-items-center gap-1">
                      {column.Header}
                      {sort?.field === column.id && (
                        <i
                          className={`mdi mdi-sort-${
                            sort?.type === "asc" ? "ascending" : "descending"
                          }`}
                        />
                      )}
                    </div>
                  ) : (
                    column.Header
                  )}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns
                .filter((column) => column.options?.visible !== false)
                .map((column) => (
                  <td
                    key={column.id}
                    className={getColumnClassNames(column)}
                    style={getColumnStyle(column)}
                  >
                    {loading && column.options?.loading !== false ? (
                      <span className="placeholder w-100" />
                    ) : (
                      column.Cell(row)
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
