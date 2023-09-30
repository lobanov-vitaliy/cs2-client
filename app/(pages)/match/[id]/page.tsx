import MatchHeader from "./components/MatchHeader";
import Scoreboard from "./components/Scoreboard";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);
  return res.json();
}

async function getRounds(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/rounds`
  );
  return res.json();
}

export default async function MatchPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [match, rounds] = await Promise.all([getMatch(id), getRounds(id)]);

  return (
    <>
      <MatchHeader match={match} />
      <Scoreboard match={match} rounds={rounds} />
    </>
  );
}
