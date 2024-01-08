import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Image from "next/image";
import getIntl from "@/components/providers/ServerIntlProvider/intl";
import { CompetitiveRank } from "@/components/Rank";
import { seconds2timestring } from "@/app/utils/time";

type MapsProps = {
  maps: Array<{
    map_name: string;
    matches: number;
    kills: number;
    assists: number;
    deaths: number;
    headshots: number;
    wins: number;
    rank: number;
    duration: number;
  }>;
};

const Maps: FC<MapsProps> = async ({ maps }) => {
  const { $t } = await getIntl();
  return (
    <div className="row">
      {maps.slice(0, 6).map((map) => {
        const winrate = +Number((map.wins / map.matches) * 100).toFixed(0);
        const kd = +Number(map.kills / map.deaths).toFixed(2);

        return (
          <div
            key={map.map_name}
            className="col-xl-2 col-lg-4 col-md-6 col-sm-12"
          >
            <Card>
              <Card.Body
                className="d-flex gap-2 flex-column justify-content-center align-items-center"
                style={{
                  background: `url(/assets/maps/screenshots/720p/${map.map_name}_png.png)`,
                  backgroundPosition: "center center",
                  height: 200,
                }}
              >
                <Image
                  width={120}
                  height={120}
                  src={`/assets/maps/map_icon_${map.map_name}.svg`}
                  alt={map.map_name}
                />
                <CompetitiveRank value={map.rank} />
              </Card.Body>

              <div className="d-flex flex-column gap-1 py-3">
                <span className="text-center">
                  <span>{$t({ id: "common.Winrate" })}: </span>
                  <span
                    className={classNames({
                      "text-success": winrate > 50,
                      "text-danger": winrate < 50,
                    })}
                  >{`${winrate}%`}</span>
                </span>
                <span className="text-center">
                  {$t({ id: "common.Matches" })}: {map.matches}
                </span>
                <span className="text-center">
                  {$t({ id: "common.K/D" })}:{" "}
                  <span
                    className={classNames("text-center", {
                      "text-success": kd >= 1,
                      "text-danger": kd < 1,
                    })}
                  >
                    {kd}
                  </span>
                </span>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Maps;
