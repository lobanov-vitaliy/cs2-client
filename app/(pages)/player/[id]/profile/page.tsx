import Avatar from "@/app/components/Avatar";
import classNames from "classnames";
import Link from "next/link";
import Maps from "./components/Maps";
import RecentMatches from "./components/RecentMatches";
import StatsOverview from "./components/StatsOverview";
import MathesHistory from "./components/MathesHistory";
import Metadata from "@/app/components/Metadata";
import Rank from "@/app/components/Rank";
import Clutches from "./components/Clutches";
import Card from "@/app/components/Card";
import MapsRadar from "./components/MapsRadar";

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

async function getClutches(id: string) {
  const res = await fetch(`${process.env.API_URL}/player/${id}/clutches`);
  return res.json();
}

export default async function PlayerProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [profile, matches, teammates, maps, clutches] = await Promise.all([
    getProfile(id),
    getMatches(id),
    getTeammates(id),
    getMaps(id),
    getClutches(id),
  ]);

  return (
    <div>
      <Metadata title={profile.name} />
      <div className="row g-1 g-lg-3 pb-4">
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
            <Rank value={profile.rank} />
          </div>
        </div>
        <div className="col col-auto">
          <div className="p-2">
            <a href={profile.steamProfileUrl} target="_black">
              <i className="mdi mdi-steam fs-2" />
            </a>
          </div>
        </div>
      </div>

      <h2 className="text-uppercase">Stats Overview</h2>
      <StatsOverview profile={profile} />

      <h2 className="text-uppercase">Recent Matches</h2>
      <RecentMatches matches={matches.data.slice(0, 3)} />

      <div className="row">
        <div className="col-12 col-lg-4">
          <h2 className="text-uppercase">Friends</h2>
          <Card className="flex-grow-1">
            <div data-simplebar>
              <div
                className={classNames("list-group list-group-flush", {
                  "align-items-center d-flex justify-content-center text-center":
                    teammates.length === 0,
                })}
                style={{ height: 205, overflow: "auto" }}
              >
                {teammates.length === 0 && (
                  <div>
                    {`We haven't found any games played with friends in the last
                    30 matches.`}
                  </div>
                )}
                {teammates.map((teammate: any) => (
                  <Link
                    style={{ padding: "7px 10px" }}
                    className="list-group-item list-group-item-action"
                    key={teammate.steamid}
                    href={`/player/${teammate.steamid}/profile`}
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center">
                          <Avatar src={teammate.avatar} size="xs" />
                          <div className="flex-shrink-0 ms-2">
                            <h6 className="fs-14 mb-0">{teammate.name}</h6>
                            <small className="text-muted">
                              Matches: {teammate.matches}
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className={classNames("text-center", {
                            "text-success":
                              (teammate.wins / teammate.matches) * 100 > 50,
                            "text-danger":
                              (teammate.wins / teammate.matches) * 100 < 50,
                          })}
                        >
                          {Number(
                            (teammate.wins / teammate.matches) * 100
                          ).toFixed(2)}
                          %
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-lg-8">
          <h2 className="text-uppercase">Clutches</h2>
          <Clutches clutches={clutches} />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-xl-3">
          <h2 className="text-uppercase">Maps Radar</h2>
          <MapsRadar maps={maps} />
        </div>
        <div className="col-12 col-xl-9">
          <h2 className="text-uppercase">Maps</h2>
          <Maps maps={maps} />
        </div>
      </div>

      <h2 className="text-uppercase">Mathes History</h2>
      <MathesHistory matches={matches.data} />
    </div>
  );
}
