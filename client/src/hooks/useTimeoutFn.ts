import { useCallback, useEffect, useRef } from 'react';

export default function useTimeoutFn(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const timeoutRef: React.MutableRefObject<number | null> = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const set = useCallback(() => {
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        callbackRef.current();
      }, delay);
    }
  }, [delay]);

  const cancel = () => {
    clear();
  };

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  return [set, cancel, reset];
}
