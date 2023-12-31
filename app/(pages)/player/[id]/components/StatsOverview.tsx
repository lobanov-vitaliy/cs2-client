import { FC } from "react";
import classNames from "classnames";
import { getMapTitle } from "@/app/utils/match";
import AnimatedNumber from "@/app/components/AnimatedNumber";
import StatsOverviewChart from "./StatsOverviewChart";
import { useIntl } from "react-intl";
import getIntl from "@/components/providers/ServerIntlProvider/intl";
import { sum } from "@/app/utils/number";

type StatsOverviewProps = {
  profile: {
    matches: number;
    kills: number;
    deaths: number;
    assists: number;
    headshots: number;
    played_rounds: number;
    kast_rounds: number;
    damage: number;
    wins: number;
    steamid: string;
    top_map_name: string;
    avatar: string;
    name: string;
    steamProfileUrl: string;
    history: {
      kd: number[];
      headshots: number[];
      kasts: number[];
      adr: number[];
    };
  };
};

const StatsOverview: FC<StatsOverviewProps> = async ({ profile }) => {
  const { $t } = await getIntl();
  const winrate = +Number((profile.wins / profile.matches) * 100).toFixed(2);
  const kd = sum(profile.history.kd) / profile.history.kd.length;
  const hs = sum(profile.history.headshots) / profile.history.headshots.length;

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card profile-overview">
          <div className="card-body p-0">
            <div className="row row-cols-xxl-6 row-cols-md-3 row-cols-1 g-0">
              <div className="col">
                <div className="p-3">
                  <h5 className="text-muted text-uppercase fs-13">
                    {$t({ id: "common.Matches" })}
                  </h5>
                  <h2 className="mb-0">
                    <AnimatedNumber start={0} end={profile.matches} />
                  </h2>
                </div>
              </div>
              <div className="col">
                <div className="p-3 position-relative">
                  <h5 className="text-muted text-uppercase fs-13">
                    {$t({ id: "common.Winrate" })}
                  </h5>
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
                  <h5 className="text-muted text-uppercase fs-13">
                    {$t({ id: "common.K/D" })}
                  </h5>
                  <div className="d-flex gap-1">
                    <h2
                      className={classNames("mb-0", {
                        "text-success": kd >= 1,
                        "text-danger": kd < 1,
                      })}
                    >
                      <AnimatedNumber
                        start={0}
                        end={
                          sum(profile.history.kd) / profile.history.kd.length
                        }
                        decimals={2}
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
                        labels={Object.keys(profile.history.kd)}
                        values={profile.history.kd}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="p-3 position-relative">
                  <h5 className="text-muted text-uppercase fs-13">
                    {$t({ id: "common.Headshots" })}
                  </h5>
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
                        values={profile.history.headshots}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h5 className="text-muted text-uppercase fs-13">
                    {$t({ id: "common.Kast" })}
                  </h5>
                  <div className="d-flex gap-1">
                    <h2 className="mb-0">
                      <AnimatedNumber
                        start={0}
                        end={
                          sum(profile.history.kasts) /
                          profile.history.kasts.length
                        }
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
                        labels={Object.keys(profile.history.kasts)}
                        values={profile.history.kasts}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="p-3">
                  <h5 className="text-muted text-uppercase fs-13">
                    {$t({ id: "common.ADR" })}
                  </h5>
                  <div className="d-flex gap-1">
                    <h2 className="mb-0">
                      <AnimatedNumber
                        start={0}
                        end={
                          sum(profile.history.adr) / profile.history.adr.length
                        }
                        decimals={2}
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
                        labels={Object.keys(profile.history.adr)}
                        values={profile.history.adr}
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
