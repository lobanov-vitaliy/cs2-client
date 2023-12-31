import { PropsWithChildren, CSSProperties } from "react";

export type CardProps = PropsWithChildren<{
  className?: string;
  animate?: boolean;
  bordered?: boolean;
  style?: CSSProperties;
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
