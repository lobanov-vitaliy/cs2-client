import { Placement } from "@popperjs/core";
import { ReactNode } from "react";

export type PopoverProps = {
  event?: "click" | "focus" | "hover" | "click-open";
  className?: string;
  disabled?: boolean;
  width?: "trigger" | number;
  defaultOpen?: boolean;
  placement?: Placement;
  appendTo?: HTMLElement;
  onOpen?: () => void;
  onClose?: () => void;
  children: ((options: { close: () => void }) => ReactNode) | ReactNode;
  trigger:
    | ((options: { isOpen: boolean; close: () => void }) => ReactNode)
    | ReactNode;
};
