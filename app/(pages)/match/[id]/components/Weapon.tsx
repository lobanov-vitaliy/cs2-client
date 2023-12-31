import { FC } from "react";

const Weapon: FC<{ name: string; size?: number }> = ({ name, size = 32 }) => {
  return <img src={`/assets/weapons/${name}.svg`} alt={name} height={size} />;
};

export default Weapon;
