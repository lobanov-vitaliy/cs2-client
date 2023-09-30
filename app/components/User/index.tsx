"use client";

import Avatar from "../Avatar";
import { useSession } from "../providers/Session";
import Popover from "../Popover";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useIntl } from "react-intl";

const User = () => {
  const session = useSession();
  const router = useRouter();
  const { $t } = useIntl();

  if (session) {
    return (
      <Popover
        event="click"
        width="trigger"
        placement="bottom-end"
        trigger={() => {
          return (
            <div className="header-item topbar-user">
              <button className="btn">
                <span className="d-flex align-items-center">
                  <Avatar src={session.avatar} size="xs" />
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                      {session.name}
                    </span>
                  </span>
                </span>
              </button>
            </div>
          );
        }}
      >
        {({ close }) => {
          return (
            <div className="d-inline-block dropdown-menu position-relative w-100">
              <Link
                className="dropdown-item"
                href={`/player/${session.steamid}`}
                onClick={() => {
                  close();
                }}
              >
                <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle">
                  {$t({ id: "common.Profile" })}
                </span>
              </Link>
              <Link
                className="dropdown-item"
                href={`/account`}
                onClick={() => {
                  close();
                }}
              >
                <i className="mdi mdi-content-save-settings text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle">
                  {$t({ id: "common.Account Settings" })}
                </span>
              </Link>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCookie("token");
                  router.push("/");
                  router.refresh();
                  close();
                }}
              >
                <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle" data-key="t-logout">
                  {$t({ id: "common.Logout" })}
                </span>
              </a>
            </div>
          );
        }}
      </Popover>
    );
  }
  return (
    <div className="header-item">
      <a
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/steam`}
        className="gap-2 d-flex align-items-center justify-content-center link-body-emphasis"
      >
        <i className="mdi mdi-steam fs-3" />
        {$t({ id: "common.Sign in with steam" })}
      </a>
    </div>
  );
};

export default User;
