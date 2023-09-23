"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Leaderboards",
    path: "/leaderboards",
  },
  {
    title: "Matches",
    path: "/matches",
  },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="app-menu navbar-menu">
      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <span data-key="t-menu">Matches</span>
            </li>
            {links.map((link) => (
              <li key={link.path} className="nav-item">
                <Link
                  href={link.path}
                  className={classNames("nav-link menu-link", {
                    "text-body-emphasis": pathname === link.path,
                  })}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
