import localFont from "next/font/local";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import classNames from "classnames";
import NProgress from "./components/NProgress";
import "./assets/scss/themes.scss";

const materialdesignicons = localFont({
  src: [
    {
      path: "./assets/fonts/materialdesignicons-webfont.woff2",
    },
  ],
  variable: "--font-materialdesignicons",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-layout="horizontal"
      data-topbar="light"
      data-sidebar-size="lg"
      data-sidebar="light"
      data-sidebar-image="none"
      data-preloader="disable"
      data-sidebar-visibility="show"
      data-layout-style="default"
      data-bs-theme="dark"
      data-layout-width="fluid"
      data-layout-position="fixed"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CS2 Stats & Accomplishments</title>
        <meta
          name="description"
          content="Compare your performance to your friends with detailed match reports, aim and utility ratings, highlights, and more."
        ></meta>
      </head>
      <body className={classNames(materialdesignicons.variable)}>
        <NProgress />
        <div id="layout-wrapper">
          <Header />
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid">{children}</div>
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
