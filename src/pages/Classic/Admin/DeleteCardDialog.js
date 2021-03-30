import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from './DialogScaffold'

const useStyles = makeStyles(theme=> ({

}));

const FieldsGrid = (props) => {
    const {setCardId, cardId, confirmFinal} = props;
    return(
    <React.Fragment>
        {
        !confirmFinal &&
        <TextField
            autoFocus
            fullWidth
            label='Card No.'
            margin='dense'
            value={cardId}
            onChange={setCardId}
        />
        }
    </React.Fragment>);
};

const DeleteCardDialog = (props) => {
    const {open, setOpen, onConfirm, playerId, playerName} = props;
    const classes = useStyles();

    const [confirmFinal, setConfirmFinal] = useState(false);
    const [cardId, setCardId] = useState('');

    const handleOpen = () => {
        setConfirmFinal(false);
        setOpen();
    };

    const handleConfirm = () => {
        if (confirmFinal) {
            onConfirm(playerId, cardId);
        } else if (cardId.length > 0) {
            setConfirmFinal(true);
        };
    }

    return (
        <DialogScaffold
        open={open}
        setOpen={handleOpen}
        onConfirm={handleConfirm}
        title='Delete Card'
        contentText={`${confirmFinal ? 
            `Are you sure to delete player ${playerId} ${playerName}'s card ${cardId}?` :
            `Specify which card you want to delete.`
            }`}
        fieldsGrid={<FieldsGrid 
                    cardId={cardId} 
                    setCardId={setCardId} 
                    confirmFinal={confirmFinal}
                    />
                   }
        confirmText={`${confirmFinal ? 'Confirm': 'Done'}`}
        />
    );
};

export default DeleteCardDialog;

