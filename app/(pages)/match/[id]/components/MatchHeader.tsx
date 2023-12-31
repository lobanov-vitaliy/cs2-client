import Metadata from "@/app/components/Metadata";
import { getMapTitle } from "@/app/utils/match";
import Image from "next/image";
import { FC } from "react";
import MatchNavigation from "./MatchNavigation";
import { format } from "date-fns";
import { MATCH_MODE } from "@/app/consts";

const MatchHeader: FC<{ match: any }> = ({ match }) => {
  return (
    <div className="position-relative">
      <Metadata
        title={`${match.teams
          .map((team: any) => team.score)
          .join(" : ")} on ${getMapTitle(match.map_name)}`}
      />
      <div className="p-4 pb-0 mb-3 row ">
        <div
          style={{
            background: `url(/assets/maps/screenshots/1080p/${match.map_name}_png.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "brightness(80%)",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />
        <div className="d-flex gap-4 col-12 col-lg-4">
          <Image
            width={120}
            height={120}
            src={`/assets/maps/map_icon_${match.map_name}.svg`}
            alt={match.map_name}
          />
          <div className="d-flex flex-column gap-2 align-items-start">
            <span className="bg-dark-subtle fs-2 px-2 py-1 rounded-3">
              {getMapTitle(match.map_name)}
            </span>
            <div className="bg-dark-subtle px-2 py-1 rounded-3 d-flex gap-1">
              {format(new Date(match.datetime), "yyyy-MM-dd HH:mm")}
            </div>
          </div>
        </div>
      </div>
      <div className="my-1">
        <MatchNavigation match={match} />
      </div>
    </div>
  );
};

export default MatchHeader;
