import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">{children}</div>
        </div>
        <Footer />
      </div>
    </>
  );
}
