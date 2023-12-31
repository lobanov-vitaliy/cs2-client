import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const useUpdateEffect = (effect: EffectCallback, debts?: DependencyList) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      effect();
    } else {
      didMount.current = true;
    }
  }, debts);
};

export default useUpdateEffect;
