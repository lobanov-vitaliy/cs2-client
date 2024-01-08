import Avatar from "@/app/components/Avatar";
import classNames from "classnames";
import Link from "next/link";
import Maps from "./components/Maps";
import RecentMatches from "./components/RecentMatches";
import StatsOverview from "./components/StatsOverview";
import MathesHistory from "./components/MathesHistory";
import Metadata from "@/app/components/Metadata";
import Clutches from "./components/Clutches";
import Card from "@/app/components/Card";
import MapsRadar from "./components/MapsRadar";
import getIntl from "@/components/providers/ServerIntlProvider/intl";
import { notFound } from "next/navigation";
import Weapons from "./components/Weapons";
import Ranks from "./components/Ranks";
import { request } from "@/app/utils/request";
import Accuracy from "./components/Accuracy";

export const dynamic = "force-dynamic";

async function getProfile(id: string) {
  const res = await request(`${process.env.NEXT_PUBLIC_API_URL}/player/${id}`);
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

async function getMatches(id: string) {
  const res = await request(
    `${process.env.NEXT_PUBLIC_API_URL}/player/${id}/matches?limit=3`
  );
  return res.json();
}

async function getTeammates(id: string) {
  const res = await request(
    `${process.env.NEXT_PUBLIC_API_URL}/player/${id}/teammates`
  );
  return res.json();
}

async function getMaps(id: string) {
  const res = await request(
    `${process.env.NEXT_PUBLIC_API_URL}/player/${id}/maps`
  );
  return res.json();
}

async function getClutches(id: string) {
  const res = await request(
    `${process.env.NEXT_PUBLIC_API_URL}/player/${id}/clutches`
  );
  return res.json();
}

async function getWeapons(id: string) {
  const res = await request(
    `${process.env.NEXT_PUBLIC_API_URL}/player/${id}/weapons`
  );
  return res.json();
}
async function getRanks(id: string) {
  const res = await request(
    `${process.env.NEXT_PUBLIC_API_URL}/player/${id}/ranks`
  );
  return res.json();
}

export default async function PlayerProfilePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const profile = await getProfile(id);
  const [matches, teammates, maps, clutches, weapons, ranks] =
    await Promise.all([
      getMatches(id),
      getTeammates(id),
      getMaps(id),
      getClutches(id),
      getWeapons(id),
      getRanks(id),
    ]);
  const { $t } = await getIntl();

  return (
    <div>
      <Metadata title={profile.name} />
      <div className="row g-1 g-lg-3 pb-4">
        <div className="col-auto">
          <div className="avatar-lg">
            <img
              alt="avatar"
              src={profile.avatar}
              className="img-thumbnail rounded-circle"
            />
          </div>
        </div>
        <div className="col">
          <div className="p-2">
            <h3 className="text-white mb-1">{profile.name}</h3>
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
      <h2 className="text-uppercase">
        <i className="mdi mdi-chart-bar me-2" />
        {$t({ id: "common.Stats Overview" })}
      </h2>
      <StatsOverview profile={profile} />
      <h2 className="text-uppercase">
        <i className="mdi mdi-cast-variant me-2" />
        {$t({ id: "common.Recent Matches" })}
      </h2>
      <RecentMatches matches={matches.data} />
      <h2 className="text-uppercase">
        <i className="mdi mdi-podium me-2" />
        {$t({ id: "common.Rank" })}
      </h2>
      <Ranks data={ranks} />
      <div className="row">
        <div className="col-12 col-lg-3">
          <h2 className="text-uppercase">
            <i className="mdi mdi-account-group me-2" />
            {$t({ id: "common.Friends" })}
          </h2>
          <Card className="flex-grow-1">
            <div data-simplebar>
              <div
                className={classNames("list-group list-group-flush", {
                  "align-items-center d-flex justify-content-center text-center":
                    teammates.length === 0,
                })}
                style={{ height: 208, overflow: "auto" }}
              >
                {teammates.length === 0 && (
                  <div>
                    {`We haven't found any games played with friends in the last
                    30 matches.`}
                  </div>
                )}
                {teammates.map((teammate: any) => {
                  const winrate = (teammate.wins / teammate.matches) * 100;
                  return (
                    <Link
                      style={{ padding: "8px 10px" }}
                      className="list-group-item list-group-item-action"
                      key={teammate.steamid}
                      href={`/player/${teammate.steamid}`}
                    >
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center">
                            <Avatar src={teammate.avatar} size="xs" />
                            <div className="flex-shrink-0 ms-2">
                              <h6 className="fs-14 mb-0">{teammate.name}</h6>
                              <small className="text-muted">
                                {$t({ id: "common.Matches" })}:{" "}
                                {teammate.matches}
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-25">
                          <div
                            className={classNames("text-center", {
                              "text-success": winrate > 50,
                              "text-danger": winrate < 50,
                            })}
                          >
                            {Number(winrate).toFixed(2)}%
                          </div>
                          <div
                            className={classNames("progress progress-sm mt-1", {
                              "progress-success": winrate > 50,
                              "progress-danger": winrate < 50,
                            })}
                          >
                            <div
                              className="progress-bar"
                              style={{
                                width: winrate + "%",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
        <div className="col-12 col-lg-9">
          <h2 className="text-uppercase">
            <i className="mdi mdi-adjust me-2" />
            {$t({ id: "common.Clutches" })}
          </h2>
          <Clutches clutches={clutches} />
        </div>
      </div>
      <h2 className="text-uppercase">
        <i className="mdi mdi-crosshairs-gps me-2" />
        {$t({ id: "common.Weapon" })}
      </h2>
      <Weapons weapons={weapons} />
      <div className="row">
        <div className="col-12 col-xl-3">
          <h2 className="text-uppercase">
            <i className="mdi mdi-radar me-2" />
            {$t({ id: "common.Maps Radar" })}
          </h2>
          <MapsRadar maps={maps} />
        </div>
        <div className="col-12 col-xl-9">
          <h2 className="text-uppercase">
            <i className="mdi mdi-map-marker-star me-2" />
            {$t({ id: "common.Maps" })}
          </h2>
          <Maps maps={maps} />
        </div>
      </div>
      <MathesHistory id={id} maps={maps} />
    </div>
  );
}
