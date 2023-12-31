import getIntl from "@/components/providers/ServerIntlProvider/intl";
import ExplosivesRounds from "../components/ExplosivesRounds";

async function getExplosives(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/explosives`
  );
  return res.json();
}

export default async function ExplosivesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const explosives = await getExplosives(id);
  const { $t } = await getIntl();
  return (
    <>
      <h2>{$t({ id: "common.Plants and Retakes" })}</h2>
      <ExplosivesRounds rounds={explosives.rounds} />
    </>
  );
}
