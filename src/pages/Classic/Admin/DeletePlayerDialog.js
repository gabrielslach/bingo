import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from './DialogScaffold'

const useStyles = makeStyles(theme=> ({

}));

const DeletePlayerDialog = (props) => {
    const {open, setOpen, onConfirm, playerId, playerName} = props;
    const classes = useStyles();

    const handleConfirm = () => {
        onConfirm(playerId);
    };

    return(
        <DialogScaffold
        open={open}
        setOpen={setOpen}
        onConfirm={handleConfirm}
        title='Delete Player'
        contentText={`Are you sure to delete player ${playerId} ${playerName}?`}
        />
    );
};

export default DeletePlayerDialog;

