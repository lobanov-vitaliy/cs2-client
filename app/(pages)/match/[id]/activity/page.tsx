import MatchHeader from "../components/MatchHeader";
import Activity from "../components/Activity";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);
  return res.json();
}

export default async function ActivityPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [match] = await Promise.all([getMatch(id)]);

  return (
    <>
      <MatchHeader match={match} />
      <Activity match={match} />
    </>
  );
}
