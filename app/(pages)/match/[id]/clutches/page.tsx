import MatchHeader from "../components/MatchHeader";
import Сlutches from "../components/Сlutches";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);
  return res.json();
}

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
  const [match, clutches] = await Promise.all([getMatch(id), getClutches(id)]);

  return (
    <>
      <MatchHeader match={match} />
      <Сlutches match={match} clutches={clutches} />
    </>
  );
}
