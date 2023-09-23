import Avatar from "@/app/components/Avatar";
import Rank from "@/app/components/Rank";
import Table from "@/app/components/Table";
import Link from "next/link";
import Matches from "./Matches";

async function getMatches() {
  const res = await fetch(`${process.env.API_URL}/matches`);
  return res.json();
}

export default async function LeaderboardsPage() {
  const matches = await getMatches();
  return (
    <>
      <Matches matches={matches} />
    </>
  );
}
