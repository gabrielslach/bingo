import React, {useEffect} from 'react';

import {Grid, TextField, Button, Paper, Typography} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles';

import {useRouteMatch} from 'react-router-dom';

import usePlayerLogin from '../../util/usePlayerLogin';

const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(3),
        '& h3': {
            fontFamily:"'Manrope', sans-serif",
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    },
    paperRoot: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
}));

function DeckViewLogin(props) {
    const {roomId} = props;
    const match = useRouteMatch();

    const classes = useStyles();

    const [cookies, isLoading, setPlayerLogin] = usePlayerLogin();

    const handleAdminLogin = e => {
        e.preventDefault();
        const password = e.target.password.value;
        const playerId = e.target.playerId.value;
        setPlayerLogin('player-login', {roomId, playerId, password});
    }

    useEffect(() => {
      if (cookies.loginToken && cookies.userInfo) {
          const {roomId, userId} = cookies.userInfo;
          if (match.path) {
          const rootPath = match.path.split('/:roomId/')[0];
          window.location.assign(`${rootPath}/${roomId}/${userId}`);
        };
      }
    }, [cookies]);

    // Temporary for UPSCA purpose
    useEffect(()=>{
        if (roomId === 'upsca') {
            const rootPath = match.path.split('/:roomId/')[0]
            window.location.assign(`${rootPath}/UPSCA`)
        }
        if (match.url[match.url.length - 1] === '/') {
            window.location.assign(match.url.substring(0,match.url.length - 1))
        }
    }, []);

    return (
    <Grid container direction='column' justify='center' alignItems='center' spacing={2} className={classes.root}>
        <Grid item md={6} sm={10} xs={12}>
            <Paper classes={{root: classes.paperRoot}}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
                    <Grid item>
                        <Typography variant='h3'>Room {roomId} Player Login</Typography>
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleAdminLogin}>
                        <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                            <Grid item md={6} xs={12}>
                                <TextField variant='outlined' label='Player ID' name='playerId' margin="dense" fullWidth/>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField variant='outlined' label='Password' name='password' type='password' margin="dense" fullWidth/>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Button variant='contained' type='submit' fullWidth disabled={isLoading}>Login</Button>
                            </Grid>
                            <Grid item md={12} xs={12}></Grid>
                            <Grid item md={10} xs={10}><Typography variant='subtitle2'>For Room Admin:</Typography></Grid>
                            <Grid item md={4} xs={12}>
                                <Button variant='outlined' type='submit' fullWidth href={`${match.url}/admin`} size='small'>Go to Admin Login</Button>
                            </Grid>
                        </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    </Grid>
    )
  }

  export default DeckViewLogin;