import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import MatchHeader from "./components/MatchHeader";
import MatchProvider from "./context";
import { notFound } from "next/navigation";

async function getMatch(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function RootLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const match = await getMatch(id);

  return (
    <>
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <MatchHeader match={match} />
            <MatchProvider match={match}>{children}</MatchProvider>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
