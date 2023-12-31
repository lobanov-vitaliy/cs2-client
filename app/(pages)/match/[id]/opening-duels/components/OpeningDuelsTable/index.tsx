"use client";

import Table from "@/app/components/Table";
import { FC, useMemo } from "react";
import { getColumns } from "./columns";
import Card from "@/app/components/Card";
import { useIntl } from "react-intl";

const OpeningDuelsTable: FC<{
  team: any;
  sort: any;
  onSort: (sort: any) => void;
}> = ({ team, sort, onSort }) => {
  const { $t } = useIntl();
  const columns = useMemo(() => getColumns(team, $t), [team, $t]);

  return (
    <Card>
      <Table
        sort={sort}
        columns={columns}
        data={team.players}
        onSort={onSort}
      />
    </Card>
  );
};

export default OpeningDuelsTable;
