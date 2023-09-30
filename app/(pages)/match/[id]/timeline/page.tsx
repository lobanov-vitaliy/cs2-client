import MatchHeader from "../components/MatchHeader";
import Timeline from "../components/Timeline";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);
  return res.json();
}

export default async function TimelinePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const match = await getMatch(id);

  return (
    <>
      <MatchHeader match={match} />
      <Timeline match={match} />
    </>
  );
}
