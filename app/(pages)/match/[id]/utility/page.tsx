import MatchHeader from "../components/MatchHeader";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);
  return res.json();
}

export default async function UtilityPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [match] = await Promise.all([getMatch(id)]);

  return (
    <>
      <MatchHeader match={match} />
      <div className="text-center p-5 fs-2">Сoming soon</div>
    </>
  );
}
