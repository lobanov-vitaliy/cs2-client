import Link from "next/link";

const Menu = () => {
  return (
    <div className="app-menu navbar-menu">
      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <span data-key="t-menu">Matches</span>
            </li>
            <li className="nav-item">
              <Link href="/" className="nav-link menu-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/leaderboards" className="nav-link menu-link">
                Leaderboards
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/all-matches" className="nav-link menu-link">
                All Matches
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
