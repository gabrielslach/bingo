import React, {useState} from 'react'

import {Grid, List, ListItem, ListItemText, Typography, Button} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        minHeight: '100%'
    },
    list: {
        maxHeight: '100%'
    }
}))

const filterFunc = (pickedNames) => (val) => {
    return (!pickedNames.includes(val))
}

function NameDrawerView(props) {
    const {ariaLabel = 'picked list', names = [], pickedNames = [], setPickedNames} = props;
    const [disabled, setDisabled] = useState(false);
    const classes = useStyles();

    const [pickedName, setPickedName] = useState('')

    const draw = () => {
        const pickedNames_copy = [...pickedNames]
        const pool = names.filter(filterFunc(pickedNames))
        const random_index = Math.floor(Math.random() * pool.length)

        console.log(pool[random_index])
        if (random_index >= pool.length) {
            setDisabled(true)
            return;
        }

        pickedNames_copy.unshift(pool[random_index])

        setPickedName(pool[random_index])
        setPickedNames(pickedNames_copy)
    }

    return(
        <Grid container direction='column' justify='flex-start' className={classes.root}>
            <Grid item>
                <Typography variant='h4'>{pickedName || 'BINGO Picker'}</Typography>
            </Grid>
            <Grid item>
                <Button variant='contained' disabled={disabled} onClick={()=>draw()} >Draw a Name</Button>
            </Grid>
        </Grid>
    )
}

export default NameDrawerView;