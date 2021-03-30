import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogScaffold(props) {
  const {
      open, 
      setOpen, 
      title='', 
      contentText='', 
      fieldsGrid=()=>(<div/>),
      confirmText='Confirm'
    } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentText}
          </DialogContentText>
          {fieldsGrid}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
