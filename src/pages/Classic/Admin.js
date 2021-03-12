import React from 'react';

import {Grid, TextField, Button, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

import useClassicGameAdmin from '../../util/useClassicGameAdmin';

const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        height: '100%'
    },
    paperRoot: {
        padding: theme.spacing(2)
    }
}))

function ClassicAdmin(props) {
    const {roomId} = props;
    const classes = useStyles();

    const  [cards = [], players = [], setClassicGameAdmin] = useClassicGameAdmin();

    const handleCreatePlayer = e => {
        e.preventDefault();
        const {name, email, noOfCards} = e.target;
        setClassicGameAdmin('register-player', {
            name: name.value,
            email: email.value,
            noOfCards: noOfCards.value
        });
    }

    return (
        <Grid container direction='row' justify='center' alignItems='center' className={classes.root}>
        <Grid item md={6} sm={10} xs={12}>
    <Paper classes={{root: classes.paperRoot}}>
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
            <Grid item>
                <Typography variant='h3'>Room {roomId} Game Master</Typography>
            </Grid>
            <Grid item>
                <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                    <Grid item>
                        <TextField variant='outlined' label='No. of Cards' margin="dense"/>
                    </Grid>
                    <Grid item>
                        <Button variant='contained'>Add Cards</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction='column' alignItems='center'>
                    <Grid item>
                        <Typography variant='subtitle2'>No. of Cards Generated: <b>000</b></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2'>No. of Cards Assigned: <b>000</b></Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='subtitle2'>No. of Cards Available: <b>000</b></Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <form onSubmit={handleCreatePlayer}>
                <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                    <Grid item md={3} sm={12}>
                        <TextField variant='outlined' label='Name' name='name' margin="dense" fullWidth/>
                    </Grid>
                    <Grid item md={4} sm={12}>
                        <TextField variant='outlined' label='Email' name='email' margin="dense" fullWidth/>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        <TextField variant='outlined' label='No of Cards' name='noOfCards' margin="dense" fullWidth/>
                    </Grid>
                    <Grid item md={2} sm={12}>
                        <Button variant='contained' type='submit' fullWidth>Create Player</Button>
                    </Grid>
                </Grid>
                </form>
            </Grid>
            <Grid item>
                <Button variant='contained'>Game Draw</Button>
            </Grid>
        </Grid>
    </Paper>
    </Grid>
    </Grid>
    )
  }

  export default ClassicAdmin;