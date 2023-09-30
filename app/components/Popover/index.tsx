import {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPopper } from "@popperjs/core";
import { PopoverProps } from "./Popover.type";
import Portal from "../Portal";

const Popover: FC<PopoverProps> = ({
  event = "click",
  defaultOpen = false,
  disabled = false,
  placement = "bottom",
  appendTo,
  width,
  trigger,
  children,
  className,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const triggerRef = useRef<HTMLDivElement>(null);
  const poperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const listener = (e: any) => {
      const { target, relatedTarget } = e;
      if (event === "click" || event === "click-open") {
        if (triggerRef.current?.contains(target)) {
          if (event === "click-open") {
            setIsOpen(true);
          } else {
            setIsOpen(!isOpen);
          }
        } else if (!poperRef.current?.contains(target)) {
          setIsOpen(false);
        }
      }

      if (event === "hover") {
        if (!isOpen && triggerRef.current?.contains(target)) {
          setIsOpen(true);
        } else if (
          isOpen &&
          (!(relatedTarget instanceof Node) ||
            (!poperRef.current?.contains(relatedTarget) &&
              !triggerRef.current?.contains(relatedTarget)))
        ) {
          setIsOpen(false);
        }
      }

      if (event === "focus") {
        if (poperRef.current?.contains(target)) {
          e.preventDefault();
        } else if (target === document.activeElement) {
          setIsOpen(true);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };

    const events: Array<string> = [];
    const targets: Array<HTMLElement | Document | null> = [];

    if (!disabled) {
      if (event === "click" || event === "click-open") {
        events.push(
          ...("ontouchstart" in document.documentElement
            ? ["touchend", "touchmove"]
            : ["click"])
        );
        targets.push(document);
      }

      if (event === "hover") {
        events.push("mouseenter", "mouseleave");
        targets.push(triggerRef.current, poperRef.current);
      }

      if (event === "focus") {
        events.push(
          "focus",
          "blur",
          "ontouchstart" in document.documentElement ? "touchend" : "mousedown"
        );
        targets.push(
          triggerRef.current?.querySelector(
            "input, textarea, button"
          ) as HTMLElement,
          poperRef.current
        );
      }
    }

    targets.forEach((target) => {
      events.forEach((event) => {
        target?.addEventListener(event, listener);
      });
    });

    return () => {
      targets.forEach((target) => {
        events.forEach((event) => {
          target?.removeEventListener(event, listener);
        });
      });
    };
  }, [triggerRef, poperRef, isOpen, event]);

  const minWidth = useMemo(() => {
    if (poperRef.current) {
      return poperRef.current.clientWidth;
    }

    return 0;
  }, [poperRef.current]);

  useLayoutEffect(() => {
    let popper: any;

    if (poperRef.current && triggerRef.current && isOpen) {
      popper = createPopper(triggerRef.current, poperRef.current, {
        placement,
        modifiers: [
          {
            name: "width",
            enabled: Boolean(width || minWidth),
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn({ state }) {
              const poperRect = state.elements.popper.getBoundingClientRect();

              if (width === "trigger") {
                const referenceRect =
                  state.elements.reference.getBoundingClientRect();
                if (referenceRect.width > poperRect.width) {
                  state.styles.popper.width = `${state.rects.reference.width}px`;
                }
              } else {
                state.styles.popper.width = `${width}px`;
              }

              if (minWidth) {
                state.styles.popper.minWidth = `${minWidth}px`;
              }
            },
          },
        ],
      });
    }

    const observer = new ResizeObserver(() => {
      if (popper) {
        popper.update();
      }
    });

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (popper) {
        popper.destroy();
      }
      observer.disconnect();
    };
  }, [poperRef.current, triggerRef.current, isOpen, width, minWidth, appendTo]);

  useEffect(() => {
    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [isOpen]);

  return (
    <>
      <div onClick={(e) => e.preventDefault()} ref={triggerRef}>
        {trigger instanceof Function
          ? trigger({ isOpen, close: () => setIsOpen(false) })
          : trigger}
      </div>

      {isOpen && (
        <Portal appendTo={appendTo}>
          <div
            ref={poperRef}
            onClick={(e) => e.preventDefault()}
            className={className}
          >
            {children instanceof Function
              ? children({ close: () => setIsOpen(false) })
              : children}
          </div>
        </Portal>
      )}
    </>
  );
};

export default Popover;
