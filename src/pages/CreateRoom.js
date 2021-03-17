import React from 'react'

import {Paper, Typography, TextField, Grid, Button} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        height: '100%'
    },
    paperRoot: {
        padding: theme.spacing(2)
    }
    
}))

function CreateRoom(props) {
    const {setRoomID} = props;
    const classes = useStyles();

    const handleCreateRoom = () => {
        setRoomID()
    }

    return(
        <Grid container direction='row' justify='center' alignItems='center' className={classes.root}>
            <Grid item md={6} sm={10} xs={12}>
        <Paper classes={{root: classes.paperRoot}}>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid item>
                    <Typography variant='h3'>Tara Bingo!</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                        <Grid item>
                            <TextField variant='outlined' label='Room ID' margin="dense"/>
                        </Grid>
                        <Grid item>
                            <Button variant='outlined'>Join Room</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant={'subtitle1'}>or</Typography>
                </Grid>
                <Grid item>
                    <Button variant='outlined' onClick={handleCreateRoom}>Create Room</Button>
                </Grid>
            </Grid>
        </Paper>
        </Grid>
        </Grid>
    )
}

export default CreateRoom;