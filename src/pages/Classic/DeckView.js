import React, {useEffect, useState} from 'react';
import {
    useParams,
    useRouteMatch
  } from "react-router-dom";

  
import {Grid, Typography, Button} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import CardView from './CardView'
import SelectCellDialog from './DeckView/SelectCellDialog';
import SelectCellChipArray from './DeckView/SelectCellChipArray';

import useClassicGameAdmin from '../../util/useClassicGameAdmin';
import usePlayerLogin from '../../util/usePlayerLogin';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
    headers: {
        marginLeft: theme.spacing(1),
        color: 'white',
        textShadow: '0.07em 0.07em #d6a224',
    },
    clickableTypo: {
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    thinTypo: {
        textShadow: '0.05em 0.05em #d6a224',
    }
}));

function DeckView(props) {
    const {roomId} = props;
    const match = useRouteMatch();

    const classes = useStyles();

    const {playerId} = useParams();
    
    const [cards = [], players = [], isLoading, setClassicGameAdmin ] = useClassicGameAdmin();
    const [cookies, isLoading2, setPlayerLogin] = usePlayerLogin();

    const [selectCellDialog, setSelectCellDialog] = useState(false);
    const [selectedChips, setSelectedChips] = useState([]);

    const handleLogout = () => {
        setPlayerLogin('logout');
    };

    const handleAddChip = () => {
        setSelectCellDialog(true);
    };

    const handleAddCellConfirm = (numArr) => {
        setSelectedChips(
            (currentState) => {
                const currentState_ = [...currentState];
                numArr.forEach(item=>{
                    const parsedItem = parseInt(item);
                    if (!currentState.includes(parsedItem)) {
                        currentState_.push(parsedItem);
                    };
                });
                return currentState_;
            }
        );
    };

    useEffect(()=> {
        if (cookies.loginToken) {
            setClassicGameAdmin('get-player', {playerId, roomId});
        } else {
            const rootPath = match.path.split('/:roomId/:playerId')[0]
            window.location.assign(`${rootPath}/${roomId}`)
        };
    }, [cookies]);
    
    return (
        <React.Fragment>
        <Grid container direction='row' alignItems = 'center' spacing={2} className={classes.root}>
            <Grid item className={classes.headers} xs={12} md={9}>
                <Typography variant='h6'><b>Welcome {players.name}!</b></Typography>
                <Typography variant='subtitle2' className={classes.thinTypo}>Player ID: {players.id}</Typography>
                <Typography variant='subtitle2' className={`${classes.clickableTypo} ${classes.thinTypo}`} onClick={handleLogout}>Logout</Typography>
                <br/>
                <Typography variant='subtitle1' className={classes.thinTypo}>Selected Cells:</Typography>
                <SelectCellChipArray chipData={selectedChips} setChipData={setSelectedChips} onAddChip={handleAddChip} />
                <br/>
            </Grid>
            {cards.map(item => (
                <Grid item key={`${playerId}-card-${item.id}`} lg={3} md={4} sm={6} xs={12}>
                    <CardView items={item.cells} cardId={`${roomId}-${item.id}`} pickedCells={selectedChips} />
                </Grid>
            ))}
        </Grid>
        <SelectCellDialog 
            open={selectCellDialog}
            setOpen={setSelectCellDialog}
            onConfirm={handleAddCellConfirm}
            />
        </React.Fragment>
    )
  }

  export default DeckView;