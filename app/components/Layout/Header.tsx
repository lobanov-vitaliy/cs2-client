import Image from 'next/image';
import MainSearch from '../MainSearch';
import Link from 'next/link';
import LanguageSwitcher from '../LanguageSwitcher';

const Header = () => {
  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex flex-grow-1">
            <div className="navbar-brand-box horizontal-logo">
              <Link href="/" className="logo">
                <span className="logo-lg">
                  <Image alt="logo" src="/favicon.gif" width={32} height={32} />
                </span>
              </Link>
            </div>
            <MainSearch />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
