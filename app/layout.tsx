import localFont from "next/font/local";
import classNames from "classnames";
import NProgress from "./components/NProgress";
import getIntl from "./components/providers/ServerIntlProvider/intl";
import { currentLocale } from "next-i18n-router";
import ServerIntlProvider from "./components/providers/ServerIntlProvider";
import SessionProvider from "./components/providers/Session";
import { getSession } from "./actions/session";
import "./assets/scss/themes.scss";

const materialdesignicons = localFont({
  src: [
    {
      path: "./assets/fonts/materialdesignicons-webfont.woff2",
    },
  ],
  variable: "--font-materialdesignicons",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const intl = await getIntl();
  const session = await getSession();
  return (
    <html
      lang={currentLocale()}
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
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>CS2 Stats & Accomplishments</title>
        <meta
          name="description"
          content="Compare your performance to your friends with detailed match reports, aim and utility ratings, highlights, and more."
        ></meta>
      </head>
      <body className={classNames(materialdesignicons.variable)}>
        <ServerIntlProvider messages={intl.messages} locale={intl.locale}>
          <NProgress />
          <SessionProvider session={session}>{children}</SessionProvider>
        </ServerIntlProvider>
      </body>
    </html>
  );
}
