import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from './DialogScaffold'

const useStyles = makeStyles(theme=> ({

}));

const FieldsGrid = (props) => {
    const {setNoOfCards, noOfCards, confirmFinal} = props;
    return(
    <React.Fragment>
        {
        !confirmFinal &&
        <TextField
            autoFocus
            fullWidth
            label='No. of cards'
            margin='dense'
            value={noOfCards}
            onChange={setNoOfCards}
        />
        }
    </React.Fragment>);
};

const AddCardDialog = (props) => {
    const {open, setOpen, onConfirm, playerId, playerName} = props;
    const classes = useStyles();

    const [confirmFinal, setConfirmFinal] = useState(false);
    const [noOfCards, setNoOfCards] = useState('');

    const handleOpen = () => {
        setConfirmFinal(false);
        setOpen();
    };

    const handleConfirm = () => {
        if (confirmFinal) {
            onConfirm(playerId, noOfCards);
        } else if (noOfCards.length > 0) {
            setConfirmFinal(true);
        };
    }

    return (
        <DialogScaffold
        open={open}
        setOpen={handleOpen}
        onConfirm={handleConfirm}
        title='Add Cards'
        contentText={`${confirmFinal ? 
            `Are you sure to add ${noOfCards} cards to player ${playerId} ${playerName}'s deck?` :
            `Specify how many cards you want to add.`
            }`}
        fieldsGrid={<FieldsGrid 
                    noOfCards={noOfCards} 
                    setNoOfCards={setNoOfCards} 
                    confirmFinal={confirmFinal}
                    />
                   }
        confirmText={`${confirmFinal ? 'Confirm': 'Done'}`}
        />
    );
};

export default AddCardDialog;

