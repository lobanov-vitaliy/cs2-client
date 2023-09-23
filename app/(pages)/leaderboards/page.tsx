import Avatar from "@/app/components/Avatar";
import Rank from "@/app/components/Rank";
import Table from "@/app/components/Table";
import Link from "next/link";
import Leaderboards from "./Leaderboards";

async function getLeaderboards() {
  const res = await fetch(`${process.env.API_URL}/player/leaderboards`);
  return res.json();
}

export default async function LeaderboardsPage() {
  const leaderboards = await getLeaderboards();
  return (
    <>
      <Leaderboards data={leaderboards} />
    </>
  );
}
