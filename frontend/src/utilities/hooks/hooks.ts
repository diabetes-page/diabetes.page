import { useCallback, useState } from 'react';

export function useMenu(): {
  visible: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  setVisible: (visibility: boolean) => void;
} {
  const [visible, setVisible] = useState(false);
  const openMenu = () => void setVisible(true);
  const closeMenu = () => void setVisible(false);

  return { visible, openMenu, closeMenu, setVisible };
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
  T | undefined,
  (newState: T) => void,
  boolean,
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
