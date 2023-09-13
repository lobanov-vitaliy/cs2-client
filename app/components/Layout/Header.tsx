const Header = () => {
  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex flex-grow-1">
            <div className="navbar-brand-box horizontal-logo">
              <a href="index.html" className="logo">
                <span className="logo-lg">logo-lg</span>
              </a>
            </div>

            <form className="app-search flex-grow-1">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for a player (Steam ID / Steam Profile Link / Custom Steam URL) or add a match"
                  autoComplete="off"
                />
                <span className="mdi mdi-magnify search-widget-icon"></span>
                <span
                  className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                  id="search-close-options"
                ></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
