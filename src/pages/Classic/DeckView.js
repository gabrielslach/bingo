import React, {useEffect} from 'react';
import {
    useParams
  } from "react-router-dom";

  
import {Grid, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import CardView from './CardView'

import useClassicGameAdmin from '../../util/useClassicGameAdmin';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
    headers: {
        marginLeft: theme.spacing(1)
    }
}));

function DeckView(props) {
    const {roomId} = props;
    const classes = useStyles();

    const {playerId} = useParams();
    
    const [cards = [], players = [], setClassicGameAdmin ] = useClassicGameAdmin();
    useEffect(()=> {
        setClassicGameAdmin('get-player', {playerId});

    }, [])
    return (
        <Grid container direction='row' alignItems = 'center' spacing={2} className={classes.root}>
            <Grid item className={classes.headers}>
                <Typography variant='h6'><b>Welcome {players.name}!</b></Typography>
                <Typography variant='subtitle2'>Player ID: {players.id}</Typography>
            </Grid>
            {cards.map(item => (
                <Grid item key={`${playerId}-card-${item.id}`} lg={3} md={4} sm={6} xs={12}>
                    <CardView items={item.cells} cardId={`${roomId}-${item.id}`}/>
                </Grid>
            ))}
        </Grid>
        
    )
  }

  export default DeckView;