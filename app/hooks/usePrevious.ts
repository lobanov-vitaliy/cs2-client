import { useEffect, useRef, useState } from "react";

const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();
  const [v, setV] = useState<{ current: T; prev: T }>({
    current: value,
    prev: value,
  });
  useEffect(() => {
    setV({ current: value, prev: ref.current || value });
    ref.current = value;
  }, [value]);

  return v;
};

export default usePrevious;
