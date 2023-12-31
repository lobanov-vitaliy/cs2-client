import Сlutches from "../components/Сlutches";

async function getClutches(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/clutches`
  );
  return res.json();
}

export default async function ClutchesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Сlutches clutches={await getClutches(id)} />;
}
