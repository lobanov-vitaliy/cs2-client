import Header from "@/components/Layout/Header";
import { notFound } from "next/navigation";
import Main from "./components/Main";

async function getRounds(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/matches/${id}/rounds`
  );

  return res.json();
}

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ReplayPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const match = await getMatch(id);
  const rounds = await getRounds(id);

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid ">
            <Main rounds={rounds} match={match} />
          </div>
        </div>
      </div>
    </>
  );
}
