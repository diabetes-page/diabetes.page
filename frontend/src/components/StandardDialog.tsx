import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  SlideProps,
} from '@material-ui/core';
import React, { useCallback } from 'react';

export type StandardDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onOk: () => void;
  okButtonText: string;
  id: string;
  okDisabled?: boolean;
  children: React.ReactNode;
};

export function StandardDialog({
  title,
  open,
  onClose,
  onOk,
  okButtonText,
  okDisabled = false,
  id,
  children,
}: StandardDialogProps): JSX.Element {
  const reactToOk = useCallback(() => {
    onOk();
    onClose();
  }, [onOk, onClose]);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      TransitionComponent={Transition}
      onClose={onClose}
      aria-labelledby={id}
      fullWidth
      keepMounted
    >
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={reactToOk} disabled={okDisabled} color="primary">
          {okButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const Transition = React.forwardRef(function Transition(
  props: SlideProps,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
