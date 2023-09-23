import classNames from "classnames";
import { FC } from "react";

export type AvatarProps = {
  src: string;
  size?: "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg";
  style?: React.CSSProperties;
};

const Avatar: FC<AvatarProps> = ({ src, style, size = "md" }) => {
  return (
    <img
      src={src}
      style={style}
      className={classNames("rounded-1", `avatar-${size}`)}
      alt="avatar"
    />
  );
};

export default Avatar;
