import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from '../CommonComponents/DialogScaffold'

const useStyles = makeStyles(theme=> ({

}));

const ResetPickedCellsDialog = (props) => {
    const {open, setOpen, onConfirm} = props;
    const classes = useStyles();

    const handleConfirm = () => {
        onConfirm();
        setOpen();
    };

    return(
        <DialogScaffold
        open={open}
        setOpen={setOpen}
        onConfirm={handleConfirm}
        title='Reset Draw Numbers'
        contentText={`Are you sure to reset the draw? This can't be undone.`}
        />
    );
};

export default ResetPickedCellsDialog;

