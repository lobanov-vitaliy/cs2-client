"use client";

import MainSearch from "../MainSearch";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import User from "../User";
import { useSession } from "../providers/Session";

const Header = () => {
  const session = useSession();
  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex flex-grow-1 gap-2">
            <Link
              href={session ? `/player/${session.steamid}` : "/"}
              className="logo"
            >
              <div className="logo-lg d-flex gap-1 align-items-center text-warning me-4 ms-3">
                <span style={{ fontSize: 10 }}>HARD</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5,8A4,4 0 0,1 9,12A4,4 0 0,1 5,16A4,4 0 0,1 1,12A4,4 0 0,1 5,8M12,1A4,4 0 0,1 16,5A4,4 0 0,1 12,9A4,4 0 0,1 8,5A4,4 0 0,1 12,1M12,15A4,4 0 0,1 16,19A4,4 0 0,1 12,23A4,4 0 0,1 8,19A4,4 0 0,1 12,15M19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A4,4 0 0,1 15,12A4,4 0 0,1 19,8M19,10A2,2 0 0,0 17,12A2,2 0 0,0 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10M12,17A2,2 0 0,0 10,19A2,2 0 0,0 12,21A2,2 0 0,0 14,19A2,2 0 0,0 12,17M12,3A2,2 0 0,0 10,5A2,2 0 0,0 12,7A2,2 0 0,0 14,5A2,2 0 0,0 12,3Z"
                  />
                </svg>
                <span style={{ fontSize: 10 }}>SCORE</span>
              </div>
            </Link>
            <MainSearch />
            <LanguageSwitcher />
            <User />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
