import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export function useMenu(): {
  open: boolean;
  anchorEl: Element | null;
  onMenuOpen: MouseEventHandler;
  onMenuClose: () => void;
} {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const onMenuOpen = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const onMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return { open: !!anchorEl, anchorEl, onMenuOpen, onMenuClose };
}

export function useLoading(): {
  loading: boolean;
  stopLoading: () => void;
  startLoading: () => void;
} {
  const [loading, setLoading] = useState(true);
  const stopLoading = useCallback(() => void setLoading(false), [setLoading]);
  const startLoading = useCallback(() => void setLoading(true), [setLoading]);

  return { loading, stopLoading, startLoading };
}

export function useLoadingState<T>(): [
  state: T | undefined,
  setState: (newState: T) => void,
  isLoading: boolean,
] {
  const { loading, stopLoading } = useLoading();
  const [state, setState] = useState<T>();
  const setStateAndLoading = useCallback(
    (newState: T) => {
      setState(newState);
      stopLoading();
    },
    [setState, stopLoading],
  );

  return [state, setStateAndLoading, loading];
}

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick(): void {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => void clearInterval(id);
    }
  }, [delay]);
}
