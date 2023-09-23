import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <div className="fs-4 d-inline-flex gap-3">
              <Link href="/" className="link-body-emphasis">
                <i className="mdi mdi-home" />
              </Link>
              <a href="#" className="link-body-emphasis">
                <i className="mdi mdi-email" />
              </a>
              <a href="#" className="link-body-emphasis">
                <i className="mdi mdi-twitter" />
              </a>
            </div>
          </div>
          <div className="col-sm-6 d-flex align-items-center justify-content-end">
            <div className="text-sm-end d-none d-sm-block">
              <a
                target="_blank"
                rel="nofollow noopener noreferrer"
                href="https://steampowered.com"
                className="link-body-emphasis mb-0"
              >
                Powered by Steam
              </a>
              . This site is not affiliated with Valve.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
