import React from 'react';

import {Grid, TextField, Button, Paper, Typography} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles'

import useClassicGameAdmin from '../../util/useClassicGameAdmin';
import PlayerDeckView from './Admin/PlayerDeckView'

const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(3)
    },
    paperRoot: {
        padding: theme.spacing(2)
    },
}));

const CssTextField = withStyles({
    root: {
      
      '& label.Mui-focused': {
        color: 'rgba(255,248,6,0.8)',
      },
      '& label': {
        color: 'rgba(255,255,255,0.8)',
      },
      '&:hover label': {
        color: 'rgba(255,248,6,0.8)',
      },
      '& .MuiOutlinedInput-root': {
        color: 'rgba(255,255,255,0.8)',
        '& fieldset': {
          borderColor: 'rgba(255,255,255,0.4)',
        },
        '&:hover fieldset': {
          borderColor: 'rgba(255,248,6,0.4)',
        },
        '&:hover': {
          color: 'rgba(255,248,6,0.8)',
        },
        '&.Mui-focused': {
          color: 'rgba(255,248,6,0.8)',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(255,248,6,0.8)',
        },
      },
    },
  })(TextField);

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
        <Grid container direction='column' justify='center' alignItems='center' spacing={2} className={classes.root}>
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
    <Grid item xs={12}>
        <CssTextField
            label="Search Player Deck"
            variant="outlined"
            id="custom-css-outlined-input"
        />
    </Grid>
    <Grid item  md={6} sm={12} xs={12}>
        <PlayerDeckView items={[[[1,4,2,5,3],[1,4,2,5,3],[1,4,2,5,3],[1,4,2,5,3],[1,4,2,5,3]],[],[],[],[],[],[]]} playerName='132 Gabriel Drix Lopez' />
    </Grid>
    </Grid>
    )
  }

  export default ClassicAdmin;