import RoundBreakdown from "./components/RoundBreakdown";
import OpeningDuels from "./components/OpeningDuels";
import getIntl from "@/components/providers/ServerIntlProvider/intl";

async function getOpeningDuels(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/opening-duels`
  );
  return res.json();
}

export default async function OpeningDuelsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const openingDuels = await getOpeningDuels(id);
  const { $t } = await getIntl();

  return (
    <>
      <OpeningDuels openingDuels={openingDuels} />
      <h2>{$t({ id: "common.Round Breakdown" })}</h2>
      <RoundBreakdown roundBreakdown={openingDuels.round_breakdown} />
    </>
  );
}
