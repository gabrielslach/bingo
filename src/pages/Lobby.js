import React from 'react'

import {useRouteMatch} from 'react-router-dom';

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

function Lobby(props) {
    const {setRoomID} = props;
    const classes = useStyles();
    const match = useRouteMatch();

    const handleCreateRoom = () => {
        //const roomID = createRoom();
        //setRoomID(roomID);
    }

    const handleGoToUPSCARoom = () => {
        const lobbyUrl = match.path
        const upscaRoomUrl = lobbyUrl + 'UPSCA';
        window.location.assign(upscaRoomUrl);
    }

    const handleGoToRoom = (e) => {
        e.preventDefault();
        const lobbyUrl = match.path
        const roomUrl = lobbyUrl + e.target.roomId.value;
        e.target.reset();
        window.location.assign(roomUrl);
    }

    return(
        <Grid container direction='row' justify='center' alignItems='center' className={classes.root}>
            <Grid item md={6} sm={10} xs={12}>
        <Paper classes={{root: classes.paperRoot}}>
            <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                <Grid item>
                    <Typography variant='h3'>Bingo!</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction='column' spacing={1} justify='center' alignItems='center'>
                        <Grid item>
                            <Button variant='outlined' onClick={handleGoToUPSCARoom}>Join UPSCA Bingo</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant={'subtitle1'}>or</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleGoToRoom}>
                    <Grid container direction='column' spacing={1} justify='center' alignItems='center'>
                        <Grid item>
                            <TextField variant='outlined' label='Room ID' margin="dense" name='roomId'/>
                        </Grid>
                        <Grid item>
                            <Button variant='outlined' type='submit'>Join Room</Button>
                        </Grid>
                    </Grid>
                    </form>
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

export default Lobby;