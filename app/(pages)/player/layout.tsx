import { getSession } from "@/app/actions/session";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {session &&
              (!session.steamAuthCode || !session.steamLastShareCode) && (
                <div className="alert alert-warning text-center" role="alert">
                  Looks like you've been playing a lot on Matchmaking, but don't
                  have it connected.{" "}
                  <Link href={"/account"}>Connect it here</Link> to get all your
                  matches imported.
                </div>
              )}
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
