import React from 'react'

import {Paper, List, ListItem, ListItemText, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        width: '100%',
    },
    list: {
        minHeight: '20em',
        maxHeight: '20em',
        overflow: 'auto',
    },
    listItemBtn: {
        textAlign: 'center'
    }
}))

function ListBox(props) {
    const {ariaLabel = 'list box', items = [], listName=''} = props;
    const classes = useStyles();

    return(
        <Paper variant='outlined' className={classes.root}>
            <Typography variant='h6'>{listName}</Typography>
            <List dense={true} aria-label={ariaLabel} className={classes.list}>
                {items.map((item, index)=>(
                    <ListItem button key={`${listName}-${index}`} classes={{button: classes.listItemBtn}}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
                
            </List>
        </Paper>
    )
}

export default ListBox;