import Image from "next/image";
import Button from "./components/Button";
import Leaderboards from "./(pages)/leaderboards/Leaderboards";
import Matches from "./(pages)/matches/Matches";

async function getLeaderboards() {
  const res = await fetch(
    `${process.env.API_URL}/player/leaderboards?limit=10`
  );
  return res.json();
}

async function getMatches() {
  const res = await fetch(`${process.env.API_URL}/matches`);
  return res.json();
}

export default async function HomePage() {
  const [matches, leaderboards] = await Promise.all([
    getMatches(),
    getLeaderboards(),
  ]);

  return (
    <div>
      <div className="py-lg-5 d-flex flex-column gap-1 align-items-center text-center">
        <h1 className="fs-48 text-warning">
          Track Your Counter-Strike 2 Performance
        </h1>
        <p className="fs-4">
          {`Track your progress to clearly see if you’ve got better at the game
          and what aspect of the game should be improved. Works both for steam
          and faceit`}
        </p>
      </div>
      <h2 className="text-uppercase">Top Players</h2>
      <Leaderboards data={leaderboards} />
      <h2 className="text-uppercase">Recent Matches</h2>
      <Matches matches={matches} />
    </div>
  );
}
