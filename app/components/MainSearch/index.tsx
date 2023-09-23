"use client";

import { useState, useEffect, useDeferredValue, useRef } from "react";
import { TEAM_PLAYER_COLOR } from "@/app/consts";
import Link from "next/link";
import Avatar from "../Avatar";
import classNames from "classnames";

const MainSearch = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const deferredValue = useDeferredValue(value);
  const [data, setData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const handleClear = () => {
    setValue("");
    ref.current?.blur();
  };

  useEffect(() => {
    const fetchScoreboard = async () => {
      const response = await fetch(
        `/api/player/search?${new URLSearchParams({ q: deferredValue.trim() })}`
      );
      setData(await response.json());
    };

    if (deferredValue.trim().length > 2) {
      fetchScoreboard();
    } else {
      setData([]);
    }
  }, [deferredValue]);

  return (
    <form className="app-search flex-grow-1">
      <div className="position-relative">
        <input
          ref={ref}
          type="text"
          className="form-control"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for a player (Steam ID / Steam Profile Link / Custom Steam URL)"
          autoComplete="off"
        />
        <span className="mdi mdi-magnify search-widget-icon" />
        <div
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          className={classNames("choices__list choices__list--dropdown", {
            "is-active": isFocus && data.length > 0,
          })}
        >
          <div className="choices__list">
            {data.map((player: any) => (
              <div
                key={player.steamid}
                className="choices__item choices__item--choice choices__item--selectable"
              >
                <Link
                  href={`/player/${player.steamid}/profile`}
                  onClick={() => {
                    handleClear();
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <Avatar
                      src={player.avatar}
                      size="xs"
                      style={{
                        border: `2px solid ${
                          TEAM_PLAYER_COLOR[player.player_color]
                        }`,
                      }}
                    />
                    <h5 className="fs-13 mb-0">{player.name}</h5>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default MainSearch;
