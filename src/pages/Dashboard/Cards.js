import React from 'react'

import {Grid, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

import Card from './Card'

const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%',
        marginTop: theme.spacing(2)
    }
}))

function Cards(props) {
    const {items = [], onSelectCard, cardProperties = {}} = props;
    const classes = useStyles();

    return(
        <React.Fragment>
            <Typography variant='h3'>Pick your card</Typography>
        <Grid container spacing={1} className={classes.root}>
            {items.map((item,index)=>
                <Grid item key={`cards-${index}`}>
                    <Card items={item} onSelectCard={()=>onSelectCard(index)} cardOwner={cardProperties[index]} />
                </Grid>
            )}
        </Grid>
        </React.Fragment>
    )
}

export default Cards;