import * as React from 'react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

// thanks Kent C Dodds for the following helpers
export type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void;
    }['bivarianceHack']
  | React.MutableRefObject<ValueType | null>;

export function useForkedRef<RefValueType = any>(
  ...refs: (AssignableRef<RefValueType> | null | undefined)[]
) {
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (node: any) => {
      refs.forEach((ref) => {
        assignRef(ref, node);
      });
    };
  }, refs);
}

export function assignRef<RefValueType = any>(
  ref: AssignableRef<RefValueType> | null | undefined,
  value: any
) {
  if (ref == null) return;
  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function isFunction(value: any): value is Function {
  return !!(value && {}.toString.call(value) == '[object Function]');
}

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
