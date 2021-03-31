import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from '../CommonComponents/DialogScaffold'

const useStyles = makeStyles(theme=> ({

}));

const DeletePlayerDialog = (props) => {
    const {open, setOpen, onConfirm} = props;
    const classes = useStyles();

    const [number, setNumber] = useState('');

    const handleConfirm = () => {
        const numArr = number.split(',');
        onConfirm(numArr);
        setNumber('');
        setOpen(false);
    };

    const handleCancel = () => {
        setNumber('');
        setOpen(false);
    };

    return(
        <DialogScaffold
        open={open}
        setOpen={setOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={`Select Number/s`}
        contentText='If adding multiple numbers, separate by comma. i.e. "10,2,5"'
        FieldsGrid={
            <TextField
                autoFocus
                fullWidth
                label='Number'
                margin='dense'
                value={number}
                onChange={e=>setNumber(e.target.value)}
            />
        }
        />
    );
};

export default DeletePlayerDialog;

