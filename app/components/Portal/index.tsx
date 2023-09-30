"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  appendTo?: HTMLElement;
  children: React.ReactElement;
  scrollbar?: boolean;
};

const DEFAULT_Z_INDEX = 2000;
let portalAmount = DEFAULT_Z_INDEX;

export const getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  return scrollbarWidth;
};

const Portal: React.FC<PortalProps> = ({
  children,
  scrollbar = true,
  appendTo = document.querySelector("body") as HTMLElement,
}) => {
  const portalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    portalAmount += 10;
    if (portalRef.current) {
      portalRef.current.style.zIndex = String(portalAmount);
      if (!scrollbar) {
        portalRef.current.setAttribute("data-scrollbar", "disabled");
      }
    }
    if (!scrollbar && document.body.scrollHeight > document.body.clientHeight) {
      document.body.style.overflow = "hidden";
      document.body.style.marginRight = getScrollbarWidth() + "px";
    }

    return (): void => {
      portalAmount -= 10;
      if (
        document.querySelectorAll("[data-scrollbar='disabled']").length === 0
      ) {
        document.body.style.overflow = "";
        document.body.style.marginRight = "";
      }
    };
  }, [appendTo, portalRef, scrollbar]);

  return (
    <>
      {createPortal(
        <div ref={portalRef} className="posf">
          {children}
        </div>,
        appendTo
      )}
    </>
  );
};

export default Portal;
