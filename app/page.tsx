import getIntl from "@/components/providers/ServerIntlProvider/intl";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Leaderboards from "./components/Leaderboards";
import Matches from "./components/Matches";
import Button from "./components/Button";
import { getSession } from "./actions/session";

async function getLeaderboards() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/player/leaderboards?limit=10`
  );
  return res.json();
}

async function getMatches() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches`);
  return res.json();
}

export default async function HomePage() {
  const [matches, leaderboards] = await Promise.all([
    getMatches(),
    getLeaderboards(),
  ]);
  const { $t } = await getIntl();
  const session = await getSession();
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="py-lg-5 d-flex flex-column gap-3 align-items-center text-center">
              <div className="d-flex mb-5 gap-1 align-items-center text-warning justify-content-center">
                <span style={{ fontSize: 32 }}>HARD</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={120}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5,8A4,4 0 0,1 9,12A4,4 0 0,1 5,16A4,4 0 0,1 1,12A4,4 0 0,1 5,8M12,1A4,4 0 0,1 16,5A4,4 0 0,1 12,9A4,4 0 0,1 8,5A4,4 0 0,1 12,1M12,15A4,4 0 0,1 16,19A4,4 0 0,1 12,23A4,4 0 0,1 8,19A4,4 0 0,1 12,15M19,8A4,4 0 0,1 23,12A4,4 0 0,1 19,16A4,4 0 0,1 15,12A4,4 0 0,1 19,8M19,10A2,2 0 0,0 17,12A2,2 0 0,0 19,14A2,2 0 0,0 21,12A2,2 0 0,0 19,10M12,17A2,2 0 0,0 10,19A2,2 0 0,0 12,21A2,2 0 0,0 14,19A2,2 0 0,0 12,17M12,3A2,2 0 0,0 10,5A2,2 0 0,0 12,7A2,2 0 0,0 14,5A2,2 0 0,0 12,3Z"
                  />
                </svg>
                <span style={{ fontSize: 32 }}>SCORE</span>
              </div>
              <h1 className="fs-48">{$t({ id: "main-page.Title" })}</h1>
              <p className="fs-4">{$t({ id: "main-page.Description" })}</p>
              {!session && (
                <div className="mt-5">
                  <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/steam`}>
                    <Button
                      size="lg"
                      className="fs-2 d-flex align-items-center gap-2"
                    >
                      <i className="mdi mdi-steam" />
                      <span>{$t({ id: "common.Sign in with steam" })}</span>
                    </Button>
                  </a>
                </div>
              )}
            </div>
            <h2 className="text-uppercase">
              {$t({ id: "common.Top Players" })}
            </h2>
            <Leaderboards data={leaderboards} />
            <h2 className="text-uppercase">
              {$t({ id: "common.Recent Matches" })}
            </h2>
            <Matches matches={matches} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
