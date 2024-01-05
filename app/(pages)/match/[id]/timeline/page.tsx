import Timeline from "../components/Timeline";

async function getRounds(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/rounds`
  );
  return res.json();
}

export default async function TimelinePage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Timeline rounds={await getRounds(id)} />;
}
