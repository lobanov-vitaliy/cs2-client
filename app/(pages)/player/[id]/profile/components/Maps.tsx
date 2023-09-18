import { FC } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Image from "next/image";

type MapsProps = {
  maps: Array<{
    map_name: string;
    matches: number;
    kills: number;
    assists: number;
    deaths: number;
    headshots: number;
    wins: number;
  }>;
};

const Maps: FC<MapsProps> = ({ maps }) => {
  return (
    <div className="row">
      {maps.map((map) => {
        const winrate = +Number((map.wins / map.matches) * 100).toFixed(0);
        const kd = +Number(map.kills / map.deaths).toFixed(2);

        return (
          <div
            key={map.map_name}
            className="col-xl-2 col-lg-3 col-md-4 col-sm-12"
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
              </Card.Body>

              <Card.Footer>
                <div className="d-flex flex-column gap-1">
                  <span className="text-center fs-5">
                    {`WINRATE: ${winrate}%`}
                  </span>
                  <span className="text-center">MATCHES: {map.matches}</span>
                  <span className="text-center">
                    K/D:{" "}
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
              </Card.Footer>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default Maps;
