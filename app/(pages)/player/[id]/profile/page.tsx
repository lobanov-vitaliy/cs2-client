import Avatar from "@/app/components/Avatar";
import classNames from "classnames";
import Link from "next/link";
import Maps from "./components/Maps";
import RecentMatches from "./components/RecentMatches";
import StatsOverview from "./components/StatsOverview";
import MathesHistory from "./components/MathesHistory";
import Metadata from "@/app/components/Metadata";

async function getProfile(id: string) {
  const res = await fetch(`${process.env.API_URL}/player/${id}`);
  return res.json();
}

async function getMatches(id: string) {
  const res = await fetch(
    `${process.env.API_URL}/player/${id}/matches?limit=10`
  );
  return res.json();
}

async function getTeammates(id: string) {
  const res = await fetch(`${process.env.API_URL}/player/${id}/teammates`);
  return res.json();
}

async function getMaps(id: string) {
  const res = await fetch(`${process.env.API_URL}/player/${id}/maps`);
  return res.json();
}

export default async function PlayerProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [profile, matches, teammates, maps] = await Promise.all([
    getProfile(id),
    getMatches(id),
    getTeammates(id),
    getMaps(id),
  ]);

  return (
    <div>
      <Metadata title={profile.name} />
      <div className="row g-4 pb-4">
        <div className="col-auto">
          <div className="avatar-lg">
            <img
              src={profile.avatar}
              className="img-thumbnail rounded-circle"
            />
          </div>
        </div>
        <div className="col">
          <div className="p-2">
            <h3 className="text-white mb-1">{profile.name}</h3>
            <div className="hstack text-white-50 fs-4 gap-1">
              <div className="me-2">Rank: {profile.top_rank}</div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <table className="table table-sm align-middle caption-top table-borderless mb-0">
            <thead className="table-light">
              <tr>
                <th>Teammate</th>
                <th className="text-center">Win rate</th>
                <th className="text-center">Recent results</th>
              </tr>
            </thead>
            <tbody>
              {teammates.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <div className="p-4">
                      {`We haven't found any games played with friends in the last 30 matches.`}
                    </div>
                  </td>
                </tr>
              )}
              {teammates.map((teammate: any) => (
                <tr key={teammate.steamid}>
                  <td>
                    <Link
                      href={`/player/${teammate.steamid}/profile`}
                      className="d-flex align-items-center gap-2"
                    >
                      <Avatar src={teammate.avatar} size="xxs" />
                      <div>
                        <h5 className="fs-13 mb-0">{teammate.name}</h5>
                        <p className="fs-12 mb-0 text-muted">
                          Matches: {teammate.matches}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td
                    className={classNames("text-center", {
                      "text-success":
                        (teammate.wins / teammate.matches) * 100 > 50,
                      "text-danger":
                        (teammate.wins / teammate.matches) * 100 < 50,
                    })}
                  >
                    <div>
                      {Number((teammate.wins / teammate.matches) * 100).toFixed(
                        2
                      )}
                      %
                    </div>
                  </td>
                  <td>
                    <div className="d-flex gap-1 justify-content-center">
                      {teammate.recent_matches_results.map(
                        (result: string, i: number) => (
                          <strong
                            key={i}
                            className={classNames({
                              "text-success": result === "win",
                              "text-danger": result === "loss",
                            })}
                          >
                            {result[0].toUpperCase()}
                          </strong>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-uppercase">Stats Overview</h2>
      <StatsOverview profile={profile} />

      <h2 className="text-uppercase">Recent Matches</h2>
      <RecentMatches matches={matches.data.slice(0, 3)} />

      <h2 className="text-uppercase">Maps</h2>
      <Maps maps={maps} />

      <h2 className="text-uppercase">Mathes History</h2>
      <MathesHistory matches={matches.data} />
    </div>
  );
}
