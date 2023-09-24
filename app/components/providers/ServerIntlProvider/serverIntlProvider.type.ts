import { ReactNode } from "react";
import { MessageFormatElement } from "react-intl";

export type serverIntlPropsType = {
  messages: Record<string, MessageFormatElement[]> | Record<string, string>;
  locale: string;
  children: ReactNode;
}