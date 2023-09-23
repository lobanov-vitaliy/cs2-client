import { FC } from "react";
import classNames from "classnames";
import { getMapTitle } from "@/app/utils/match";
import AnimatedNumber from "@/app/components/AnimatedNumber";
import StatsOverviewChart from "./StatsOverviewChart";

type StatsOverviewProps = {
  profile: {
    matches: number;
    kills: number;
    deaths: number;
    assists: number;
    headshots: number;
    top_rank: number;
    wins: number;
    steamid: string;
    top_map_name: string;
    avatar: string;
    name: string;
    steamProfileUrl: string;
    history: {
      kills: number[];
      deaths: number[];
      headshots: number[];
      ranks: number[];
    };
  };
};

const StatsOverview: FC<StatsOverviewProps> = ({ profile }) => {
  const winrate = +Number((profile.wins / profile.matches) * 100).toFixed(2);
  const kd = +Number(profile.kills / profile.deaths).toFixed(2);
  const hs = +Number((profile.headshots / profile.kills) * 100).toFixed(2);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card profile-overview">
          <div className="card-body p-0">
            <div className="row row-cols-xxl-6 row-cols-md-3 row-cols-1 g-0">
              <div className="col">
                <div className="p-3">
                  <h5 className="text-muted text-uppercase fs-13">Matches</h5>
                  <h2 className="mb-0">
                    <AnimatedNumber start={0} end={profile.matches} />
                  </h2>
                </div>
              </div>
              <div className="col">
                <div className="p-3 position-relative">
                  <h5 className="text-muted text-uppercase fs-13">Winrate</h5>
                  <h2
                    className={classNames("mb-0", {
                      "text-success": winrate > 50,
                      "text-danger": winrate < 50,
                    })}
                  >
                    <AnimatedNumber
                      start={0}
                      end={winrate}
                      decimals={2}
                      suffix="%"
                    />
                  </h2>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h5 className="text-muted text-uppercase fs-13">K/D</h5>
                  <div className="d-flex gap-1">
                    <h2
                      className={classNames("mb-0", {
                        "text-success": kd >= 1,
                        "text-danger": kd < 1,
                      })}
                    >
                      <AnimatedNumber start={0} end={kd} decimals={2} />
                    </h2>
                    <div
                      style={{
                        height: 80,
                        width: 150,
                        position: "absolute",
                        right: -5,
                        bottom: -5,
                      }}
                    >
                      <StatsOverviewChart
                        labels={Object.keys(profile.history.kills)}
                        values={profile.history.kills.map(
                          (kill, i) =>
                            +Number(kill / profile.history.deaths[i]).toFixed(2)
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="p-3 position-relative">
                  <h5 className="text-muted text-uppercase fs-13">Headshots</h5>
                  <div className="d-flex gap-1">
                    <h2 className="mb-0">
                      <AnimatedNumber
                        start={0}
                        end={hs}
                        decimals={2}
                        suffix="%"
                      />
                    </h2>
                    <div
                      style={{
                        height: 80,
                        width: 150,
                        position: "absolute",
                        right: -5,
                        bottom: -5,
                      }}
                    >
                      <StatsOverviewChart
                        labels={Object.keys(profile.history.headshots)}
                        values={profile.history.headshots.map(
                          (headshot, i) =>
                            +Number(
                              headshot / profile.history.kills[i]
                            ).toFixed(2)
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="p-3 position-relative">
                  <h5 className="text-muted text-uppercase fs-13">Top map</h5>
                  <h2 className="mb-0">{getMapTitle(profile.top_map_name)}</h2>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h5 className="text-muted text-uppercase fs-13">Best Rank</h5>
                  <div className="d-flex gap-1">
                    <h2 className="mb-0">
                      <AnimatedNumber start={0} end={profile.top_rank} />
                    </h2>
                    <div
                      style={{
                        height: 80,
                        width: 150,
                        position: "absolute",
                        right: -5,
                        bottom: -5,
                      }}
                    >
                      <StatsOverviewChart
                        labels={Object.keys(profile.history.ranks)}
                        values={profile.history.ranks}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
