import i18nConfig from "@/i18nConfig";
import { createIntl } from "@formatjs/intl";
import { currentLocale } from "next-i18n-router";

export default async function getIntl() {
  const locale = currentLocale() || i18nConfig.defaultLocale;

  return createIntl({
    locale: locale,
    messages: await fetch(
      `${process.env.TRANSLATION_HOST}/api/translations/cs/front/${locale}/file/`
    ).then((res) => res.json()),
  });
}
