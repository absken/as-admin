import * as React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';

export function useSafeSetState<T>(
  initialState?: T | (() => T)
): [T | any, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState(initialState);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const safeSetState = useCallback(
    (args) => {
      if (mountedRef.current) {
        return setState(args);
      }
    },
    [mountedRef, setState]
  );

  return [state, safeSetState];
}

export function useTimeout(ms = 0) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, ms);

    return () => {
      clearTimeout(timer);
    };
  }, [ms]);

  return ready;
}
