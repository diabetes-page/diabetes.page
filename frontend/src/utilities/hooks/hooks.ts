import { useState } from 'react';

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
