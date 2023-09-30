"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCurrentLocale } from "next-i18n-router/client";

import { MouseEvent, useState } from "react";
import i18nConfig from "@/i18nConfig";
import Button from "../Button";
import classNames from "classnames";
import Popover from "../Popover";

const languages: {
  title: string;
  code: "en" | "uk";
  image: string;
}[] = [
  {
    title: "English",
    code: "en",
    image: "/assets/flags/en.svg",
  },
  {
    title: "Українська",
    code: "uk",
    image: "/assets/flags/uk.svg",
  },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale =
    useCurrentLocale(i18nConfig) || i18nConfig.defaultLocale;
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLanguage = (e: MouseEvent<HTMLDivElement>) => {
    const newLocale = e.currentTarget.getAttribute("data-lang");
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
    setIsOpen(false);
  };

  return (
    <Popover
      event="click"
      width="trigger"
      placement="bottom-end"
      trigger={() => {
        return (
          <div className="header-item">
            <Button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              variant="ghost"
              className="btn-icon btn-topbar rounded-circle"
            >
              <img
                id="header-lang-img"
                alt="Header Language"
                height="20"
                className="rounded-4"
                src={`/assets/flags/${currentLocale}.svg`}
              />
            </Button>
          </div>
        );
      }}
    >
      {({ close }) => {
        return (
          <div className="d-inline-block dropdown-menu position-relative w-100">
            {languages.map(({ title, code, image }) => (
              <div
                onClick={(e) => {
                  handleChangeLanguage(e);
                  close();
                }}
                key={code}
                className="cursor-pointer dropdown-item notify-item language py-2"
                data-lang={code}
                title={title}
              >
                <img
                  src={image}
                  alt="user-image"
                  className="me-2 rounded-4"
                  height="18"
                />
                <span className="align-middle">{title}</span>
              </div>
            ))}
          </div>
        );
      }}
    </Popover>
  );
};

export default LanguageSwitcher;
