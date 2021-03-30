import React, {useState} from 'react';
import {TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from '../CommonComponents/DialogScaffold'

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
            onChange={e=>setNoOfCards(e.target.value)}
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
            setOpen();
            setNoOfCards('');
            setConfirmFinal(false);
        } else if (noOfCards.length > 0) {
            setConfirmFinal(true);
        };
    };

    const handleCancel = ()=>{
        setNoOfCards('');
    };

    return (
        <DialogScaffold
        open={open}
        setOpen={handleOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title='Add Cards'
        contentText={`${confirmFinal ? 
            `Are you sure to add ${noOfCards} cards to player ${playerId} ${playerName}'s deck?` :
            `Specify how many cards you want to add.`
            }`}
        FieldsGrid={<FieldsGrid 
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

