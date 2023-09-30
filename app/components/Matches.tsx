"use client";

import Avatar from "@/app/components/Avatar";
import Card from "@/app/components/Card";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import { getMapTitle } from "@/app/utils/match";
import classNames from "classnames";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

const Matches = ({ matches }: any) => {
  return (
    <div className="row">
      {matches.map((match: any) => {
        return (
          <Link
            key={match.match_id}
            href={`/match/${match.match_id}`}
            className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
          >
            <Card animate>
              <Card.Header className="d-flex p-2 justify-content-between">
                <span>
                  {format(new Date(match.datetime), "yyyy-MM-dd HH:mm")}
                </span>
                <span>Matchmaking</span>
              </Card.Header>
              <Card.Body
                style={{
                  background: `url(/assets/maps/screenshots/720p/${match.map_name}_png.png)`,
                  backgroundPosition: "center center",
                }}
              >
                <div className="d-flex gap-2 align-items-center">
                  <Image
                    width={64}
                    height={64}
                    src={`/assets/maps/map_icon_${match.map_name}.svg`}
                    alt={match.map_name}
                  />
                  <div className="fs-4 bg-dark rounded-2 d-flex gap-2 p-2">
                    <span>{getMapTitle(match.map_name)}</span>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer className="d-flex p-2 justify-content-between align-items-center">
                <div className="d-flex gap-1">
                  {match.teams[0].players.map((player: any) => (
                    <Avatar
                      key={player.steamid}
                      src={player.avatar}
                      size="xxxs"
                      style={{
                        border: `1px solid ${
                          TEAM_PLAYER_COLOR[player.player_color]
                        }`,
                      }}
                    />
                  ))}
                </div>
                <div className="d-flex gap-1 fs-5">
                  <span
                    className={classNames("text-center", {
                      "text-success": match.teams[0].result === "win",
                      "text-danger": match.teams[0].result === "loss",
                    })}
                  >
                    {match.teams[0].score}
                  </span>
                  <span>:</span>
                  <span
                    className={classNames("text-center", {
                      "text-success": match.teams[1].result === "win",
                      "text-danger": match.teams[1].result === "loss",
                    })}
                  >
                    {match.teams[1].score}
                  </span>
                </div>
                <div className="d-flex gap-1">
                  {match.teams[1].players.map((player: any) => (
                    <Avatar
                      key={player.steamid}
                      src={player.avatar}
                      size="xxxs"
                      style={{
                        border: `1px solid ${
                          TEAM_PLAYER_COLOR[player.player_color]
                        }`,
                      }}
                    />
                  ))}
                </div>
              </Card.Footer>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Matches;
