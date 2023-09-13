import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  createElement,
} from "react";
import { ButtonProps } from "./button.type";
import classNames from "classnames";

const Button: FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  border = false,
  type = "button",
  color = "primary",
  variant = "primary",
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={classNames("btn", {
        "btn-border": border,
        [`btn-${color}`]: variant === "primary",
        [`btn-${variant}-${color}`]: variant !== "primary",
      })}
    >
      {children}
    </button>
  );
};

export default Button;

const Header: FC<
  PropsWithChildren<{ title?: string; onClose?: () => void }>
> = ({ children, title, onClose }) => {
  return (
    <div className="card-header">
      {onClose && <div onClick={onClose}>Close</div>}
      {title && <div>{title}</div>}
      {children}
    </div>
  );
};

const Body: FC<PropsWithChildren> = ({ children }) => {
  return <div className="card-body">{children}</div>;
};

const Footer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="card-footer">{children}</div>;
};

const Card: FC<
  PropsWithChildren<{
    animate?: boolean;
    className?: string;
    onClose?: () => void;
  }>
> & {
  Header: typeof Header;
  Footer: typeof Footer;
  Body: typeof Body;
} = ({ animate = false, className, children, onClose }) => {
  const HeaderA = React.Children.toArray(children).find((child) => {
    return true;
  }) as ReactElement;

  return (
    <div
      className={classNames(className, {
        "card-animate": animate,
      })}
    >
      {HeaderA &&
        cloneElement(HeaderA, {
          onClose,
        })}
      {children}
      {HeaderA &&
        cloneElement(HeaderA, {
          onClose,
        })}
    </div>
  );
};

Card.Header = Header;
Card.Footer = Footer;
Card.Body = Body;

const Test = () => {
  return (
    <Card onClose={() => {}}>
      <Card.Body>test</Card.Body>
      <Card.Header>test</Card.Header>
    </Card>
  );
};
