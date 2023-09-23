import MatchHeader from "../components/MatchHeader";
import Card from "@/app/components/Card";
import intervalToDuration from "date-fns/intervalToDuration";
import Avatar from "@/app/components/Avatar";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import Table from "@/app/components/Table";
import RoundBreakdown from "./components/RoundBreakdown";
import OpeningDuelsTable from "./components/OpeningDuelsTable";
import OpeningDuels from "./components/OpeningDuels";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.API_URL}/matches/${id}`);
  return res.json();
}

async function getOpeningDuels(id: string) {
  const res = await fetch(`${process.env.API_URL}/matches/${id}/opening-duels`);
  return res.json();
}

export default async function OpeningDuelsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [match, openingDuels] = await Promise.all([
    getMatch(id),
    getOpeningDuels(id),
  ]);

  return (
    <>
      <MatchHeader match={match} />
      <OpeningDuels match={match} openingDuels={openingDuels} />
      <h2>Round Breakdown</h2>
      <RoundBreakdown
        match={match}
        roundBreakdown={openingDuels.round_breakdown}
      />
    </>
  );
}
