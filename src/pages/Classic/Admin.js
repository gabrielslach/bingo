import React from 'react';

import {Grid, TextField, Button, Paper, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

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
                        <Button variant='outlined'>Add Cards</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                    <Grid item md={6} sm={12}>
                        <TextField variant='outlined' label='Name' margin="dense"/>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        <TextField variant='outlined' label='No of Cards' margin="dense"/>
                    </Grid>
                    <Grid item md={3} sm={12}>
                        <Button variant='outlined'>Join Room</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button variant='outlined'>Game Draw</Button>
            </Grid>
        </Grid>
    </Paper>
    </Grid>
    </Grid>
    )
  }

  export default ClassicAdmin;