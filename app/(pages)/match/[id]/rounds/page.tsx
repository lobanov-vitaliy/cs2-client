import Rounds from "../components/Rounds";

async function getRounds(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/rounds`
  );
  return res.json();
}

export default async function RoundsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Rounds rounds={await getRounds(id)} />;
}
