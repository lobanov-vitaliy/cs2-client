import { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren<{
  className?: string;
  animate?: boolean;
}>;

export type HeaderProps = PropsWithChildren<{
  title?: string;
  onClose?: () => void;
  className?: string;
}>;

export type BodyProps = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
}>;
export type FooterProps = PropsWithChildren<{
  className?: string;
}>;
