import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from '../CommonComponents/DialogScaffold'

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
            onChange={e=>setCardId(e.target.value)}
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
            const cardId_ = cardId.split('-');
            onConfirm(playerId, cardId_[cardId_.length-1]);
            setOpen();
            setCardId('');
            setConfirmFinal(false);
        } else if (cardId.length > 0) {
            setConfirmFinal(true);
        };
    };

    const handleCancel = () => {
        setCardId('');
    };

    return (
        <DialogScaffold
        open={open}
        setOpen={handleOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title='Delete Card'
        contentText={`${confirmFinal ? 
            `Are you sure to delete player ${playerId} ${playerName}'s card ${cardId}?` :
            `Specify which card you want to delete.`
            }`}
        FieldsGrid={<FieldsGrid 
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

