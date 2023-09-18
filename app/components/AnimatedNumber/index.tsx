"use client";

import CountUp, { CountUpProps } from "react-countup";
import { FC } from "react";

const AnimatedNumber: FC<CountUpProps> = ({ children, ...props }) => {
  return (
    <CountUp delay={0} duration={1} {...props}>
      {children}
    </CountUp>
  );
};

export default AnimatedNumber;
