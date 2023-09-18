import classNames from "classnames";
import { FC } from "react";

export type AvatarProps = {
  src: string;
  size?: "xxs" | "xs" | "sm" | "md" | "lg";
};

const Avatar: FC<AvatarProps> = ({ src, size = "md" }) => {
  return (
    <img
      src={src}
      className={classNames("rounded-circle", `avatar-${size}`)}
      alt="avatar"
    />
  );
};

export default Avatar;
