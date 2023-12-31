import MatchHeader from "./components/MatchHeader";
import Scoreboard from "./components/Scoreboard";

async function getRounds(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/rounds`
  );

  return res.json();
}

async function getScoreboard(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/scoreboard`
  );

  return res.json();
}

export default async function MatchPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [rounds, scoreboard] = await Promise.all([
    getRounds(id),
    getScoreboard(id),
  ]);

  const leaders = scoreboard
    .sort((a: any, b: any) => b.hltv_rating - a.hltv_rating)
    .slice(0, 3);

  return (
    <Scoreboard rounds={rounds} scoreboard={scoreboard} leaders={leaders} />
  );
}
