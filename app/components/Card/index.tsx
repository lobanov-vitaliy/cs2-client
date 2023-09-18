import React, { FC } from "react";
import { BodyProps, CardProps, FooterProps, HeaderProps } from "./card.type";
import cn from "classnames";

const Header: FC<HeaderProps> = ({ children, title, onClose, className }) => {
  return (
    <div className={cn("card-header", className)}>
      {onClose && (
        <button
          type="button"
          className="btn-close float-end fs-11"
          aria-label="Close"
          onClick={onClose}
        />
      )}
      {title && <div className={cn("card-title mb-0", className)}>{title}</div>}
      {children}
    </div>
  );
};

const Body: FC<BodyProps> = ({ children, className, style }) => {
  return (
    <div style={style} className={cn("card-body", className)}>
      {children}
    </div>
  );
};

const Footer: FC<FooterProps> = ({ children, className }) => {
  return <div className={cn("card-footer", className)}>{children}</div>;
};

const Card: FC<CardProps> & {
  Header: typeof Header;
  Body: typeof Body;
  Footer: typeof Footer;
} = ({ children, className, animate = false, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "card",
        {
          "card-animate": animate,
        },
        className
      )}
    >
      {children}
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
