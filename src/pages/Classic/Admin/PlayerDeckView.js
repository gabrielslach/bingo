import React from 'react'

import {Grid, Typography, Paper} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Card from './Card'

const useStyles = makeStyles((theme)=>({
    gridRoot: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    paperRoot: {
        backgroundColor: 'rgba(0,0,0,0)',
        padding: theme.spacing(2),
        borderColor: 'rgba(255,255,255,0.3)',
        '& h5': {
            color: 'white',
            textShadow: '2px 2px 4px #000000'
        }
    },
}))

function PlayerDeckView(props) {
    const {items = [], onSelectCard, playerName=''} = props;
    const classes = useStyles();

    return(
        <Paper variant="outlined" className={classes.paperRoot}>
            <Typography variant='h5'><b>{playerName}'s Deck</b></Typography>
            <Grid container spacing={1} className={classes.gridRoot}>
                {items.map((item,index)=>
                    <Grid item key={`cards-${index}`}>
                        <Card items={item} onSelectCard={()=>onSelectCard(index)} cardId='' />
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default PlayerDeckView;