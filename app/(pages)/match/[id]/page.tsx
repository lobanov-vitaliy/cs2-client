import classNames from "classnames";
import Image from "next/image";
import TeamTable from "../components/TeamTable";
import { getMapTitle } from "@/app/utils/match";
import Metadata from "@/app/components/Metadata";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.API_URL}/matches/${id}`);
  return res.json();
}

async function getScoreboard(id: string) {
  const res = await fetch(`${process.env.API_URL}/matches/${id}/scoreboard`);
  return res.json();
}

export default async function MatchPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [match, scoreboard] = await Promise.all([
    getMatch(id),
    getScoreboard(id),
  ]);

  const teams = match.teams.map((team: any, i: number) => ({
    ...team,
    name: team.name || "Team " + (i ? "B" : "A"),
    players: team.players.map((player: any) => ({
      ...player,
      ...scoreboard.find(({ steamid }: any) => steamid === player.steamid),
    })),
  }));

  return (
    <div>
      <Metadata
        title={`${match.teams
          .map((team: any) => team.score)
          .join(" : ")} on ${getMapTitle(match.map_name)}`}
      />

      <div className="p-4 mb-2 position-relative">
        <div className="d-flex gap-4 position-relative">
          <Image
            width={120}
            height={120}
            src={`/assets/maps/map_icon_${match.map_name}.svg`}
            alt={match.map_name}
          />
          <div className="d-flex flex-column gap-2 align-items-start">
            <span className="bg-dark-subtle fs-3 px-3 py-2 rounded-4">
              {getMapTitle(match.map_name)}
            </span>
            <div className="bg-dark-subtle fs-2 px-3 rounded-4 d-flex gap-1">
              {match.teams
                .map((team: any) => (
                  <div
                    key={team.id}
                    className={classNames("text-center", {
                      "text-success": team.result === "win",
                      "text-danger": team.result === "loss",
                    })}
                  >
                    {team.score}
                  </div>
                ))
                .reduce((result: any, item: any) => (
                  <>
                    {result}
                    <div>:</div>
                    {item}
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <TeamTable team={teams[0]} />
        <TeamTable team={teams[1]} />
      </div>
    </div>
  );
}
