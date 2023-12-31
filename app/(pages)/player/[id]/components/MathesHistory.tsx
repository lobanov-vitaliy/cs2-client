"use client";

import { FC, Fragment, useEffect, useState } from "react";
import Card from "@/app/components/Card";
import classNames from "classnames";
import Image from "next/image";
import { format } from "date-fns";
import { getMapTitle, getMatchModeTranslateKey } from "@/app/utils/match";
import { RankByMatchMode } from "@/components/Rank";
import { useIntl } from "react-intl";
import Dropdown from "@/components/Dropdown";
import { useRouter } from "next/navigation";
import PlayerMatchRounds from "@/app/(pages)/match/[id]/components/PlayerMatchRounds";
import { MATCH_MODE } from "@/app/consts";
import Pagination from "@/components/Pagination";

type MathesHistoryProps = {
  id: string;
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

const LIMIT = 15;

const MathesHistory: FC<MathesHistoryProps> = ({ id, maps }) => {
  const { $t } = useIntl();
  const [ids, setIds] = useState<string[]>([]);
  const [mapSelected, setMapSelected] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);
  const [page, setPage] = useState(1);
  const [matches, setMatches] = useState({
    data: [],
    total: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      let params: Record<string, string> = {
        limit: String(LIMIT),
        offset: String(page === 1 ? 0 : page * LIMIT - LIMIT),
      };

      if (mapSelected.length > 0) {
        params.maps = mapSelected.map((data) => data.value).join(",");
      }

      const response = await fetch(
        `/api/player/${id}/matches?${new URLSearchParams(params)}`
      );
      const data = await response.json();
      setMatches(data);
    };

    fetchData();
  }, [page, id, mapSelected]);

  return (
    <>
      <div className="align-items-end mb-2 d-flex justify-content-between">
        <h2 className="text-uppercase mb-0">
          <i className="mdi mdi-monitor-multiple me-2" />
          {$t({ id: "common.Matches" })}
        </h2>
        <div className="align-content-center d-flex gap-1">
          <Dropdown
            isMulti
            placeholder={$t({ id: "common.All maps" })}
            value={mapSelected}
            onChange={setMapSelected}
            options={maps.map((map: any) => ({
              value: map.map_name,
              label: <>{getMapTitle(map.map_name)}</>,
            }))}
          />
          {/* {teammates.length > 0 && (
            <Dropdown
              placeholder="All friends"
              options={teammates.map((teammate: any) => ({
                value: teammate.steamid,
                label: teammate.name,
              }))}
            />
          )} */}
        </div>
      </div>

      <Card>
        <div className="table-responsive">
          <table className="table table-hover table-nowrap table-striped table-sm align-middle caption-top table-borderless mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{ width: 10 }} />
                <th className="text-center" style={{ width: 60 }}>
                  {$t({ id: "common.Date" })}
                </th>
                <th style={{ width: 120 }}>{$t({ id: "common.Map" })}</th>
                <th>{$t({ id: "common.Rank" })}</th>
                <th className="text-center">{$t({ id: "common.Score" })}</th>
                <th className="text-center">{$t({ id: "common.Kills" })}</th>
                <th className="text-center">{$t({ id: "common.Deaths" })}</th>
                <th className="text-center">{$t({ id: "common.Assists" })}</th>
                <th className="text-center">{$t({ id: "common.Damage" })}</th>
                <th className="text-center">{$t({ id: "common.K/D" })}</th>
                <th className="text-center">%{$t({ id: "common.HS" })}</th>
                <th className="text-center" style={{ width: 60 }}>
                  {$t({ id: "common.Source" })}
                </th>
              </tr>
            </thead>
            <tbody>
              {matches.data.map((match: any, index) => (
                <Fragment key={`${match.match_id}-${index}`}>
                  <tr
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/match/${match.match_id}`);
                    }}
                  >
                    <td className="text-center">
                      <div
                        className="form-check form-switch"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIds((state) => {
                            if (state.includes(match.match_id)) {
                              return state.filter(
                                (id) => id !== match.match_id
                              );
                            }

                            return [...state, match.match_id];
                          });
                        }}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={ids.includes(match.match_id)}
                        />
                      </div>
                    </td>
                    <td className="text-center">
                      {format(new Date(match.datetime), "yyyy-MM-dd")}
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Image
                          width={32}
                          height={32}
                          src={`/assets/maps/map_icon_${match.map_name}.svg`}
                          alt={match.map_name}
                        />
                        <div>
                          <div>{getMapTitle(match.map_name)}</div>
                          <div className="text-muted" style={{ fontSize: 10 }}>
                            {$t({
                              id: getMatchModeTranslateKey(
                                match.match_making_mode
                              ),
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <RankByMatchMode
                          value={match.rank}
                          mode={match.match_making_mode}
                        />
                        {Boolean(match.rank_change) &&
                          match.match_making_mode === MATCH_MODE.Premier && (
                            <div
                              className={classNames({
                                "text-success": match.rank_change > 0,
                                "text-danger": match.rank_change < 0,
                              })}
                            >
                              {match.rank_change > 0
                                ? `+${match.rank_change}`
                                : match.rank_change}
                            </div>
                          )}
                      </div>
                    </td>
                    <td
                      className={classNames("text-center", {
                        "text-success": match.result === "win",
                        "text-danger": match.result === "loss",
                      })}
                    >
                      {match.scores.join(":")}
                    </td>
                    <td className="text-center">{match.kills}</td>
                    <td className="text-center">{match.deaths}</td>
                    <td className="text-center">{match.assists}</td>
                    <td className="text-center">{match.damage}</td>
                    <td
                      className={classNames("text-center", {
                        "text-success": match.kd >= 1,
                        "text-danger": match.kd < 1,
                      })}
                    >
                      {Number(match.kd).toFixed(2)}
                    </td>
                    <td
                      className={classNames("text-center", {
                        "text-success": match.hs > 50,
                        "text-danger": match.hs < 50,
                      })}
                    >{`${match.hs.toFixed(1)}%`}</td>
                    <td className="text-center">
                      {match.data_source === "manual" ? (
                        <i className="mdi mdi-cloud-upload fs-4" />
                      ) : (
                        <i className="mdi mdi-steam fs-4" />
                      )}
                    </td>
                  </tr>
                  {ids.includes(match.match_id) && (
                    <tr>
                      <td colSpan={12}>
                        <PlayerMatchRounds player_id={id} match={match} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={12}>
                  <Pagination
                    className="justify-content-end"
                    page={page}
                    onChange={(page) => setPage(page)}
                    total={matches.total}
                    pageCount={LIMIT}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </>
  );
};

export default MathesHistory;
