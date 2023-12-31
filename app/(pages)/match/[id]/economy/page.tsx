import Economy from "../components/Economy";

async function getRounds(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/rounds`
  );

  return res.json();
}

async function getEconomy(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/economy`
  );

  return res.json();
}

export default async function EconomyPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [rounds, economy] = await Promise.all([getRounds(id), getEconomy(id)]);
  return <Economy rounds={rounds} economy={economy} />;
}
