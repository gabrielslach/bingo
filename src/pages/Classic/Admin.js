import React, {useEffect, useState} from 'react';

import {
    Grid, 
    TextField, 
    Button, 
    Paper, 
    Typography, 
    Dialog, 
    DialogContent, 
    DialogActions,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import {makeStyles, withStyles} from '@material-ui/core/styles'

import {useRouteMatch} from 'react-router-dom';

import useClassicGameAdmin from '../../util/useClassicGameAdmin';
import usePlayerLogin from '../../util/usePlayerLogin';
import PlayerDeckView from './Admin/PlayerDeckView';
import CardView from './CardView';

import useGameDrawer from '../../util/useGameDrawer';

const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(3)
    },
    paperRoot: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    deckViewGrid: {
        minWidth: '66.7%'
    }, 
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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
        '&.Mui-focused fieldset': {
          borderColor: 'rgba(255,248,6,0.8)',
        },
      },
    },
  })(TextField);

function ClassicAdmin(props) {
    const {roomId} = props;
    const classes = useStyles();
    const match = useRouteMatch();

    const [cookies, setPlayerLogin] = usePlayerLogin();
    const  [cards = [], players = [], isLoading, setClassicGameAdmin] = useClassicGameAdmin();
    const [pickedCells, setPickedCells] = useGameDrawer();
    const [filteredList, setFilteredList] = useState([])
    const [selectedCard, setSelectedCard] = useState({});
    const [openCardDialog, setOpenCardDialog] = useState(false);

    const handleCreatePlayer = e => {
        e.preventDefault();
        const {name, email, noOfCards} = e.target;
        if (name.value.length < 1 || parseInt(noOfCards.value) < 1) {
            alert('Incomplete player details!');
            return;
        }
        setClassicGameAdmin('register-player', {
            name: name.value,
            email: email.value,
            noOfCards: noOfCards.value,
            roomId
        });
    };

    const handleAdminLogin = e => {
        e.preventDefault();
        const password = e.target.password.value;
        setPlayerLogin('login', {roomId, password});
    };

    const filterFx = searchTxt => item => {
        const {id, name, email} = item.player;

        const itemToString = `${id} ${name} ${email}`;

        return (itemToString.toUpperCase().indexOf(searchTxt.toUpperCase()) >= 0);
    }

    const handleSearch = e => {
        e.preventDefault();
        const searchText = e.target.searchText.value;
        if (searchText.length > 0) {
          const filtered = players.filter(filterFx(searchText));
          setFilteredList(filtered);
        } else {
            setFilteredList(players);
        }
    };

    const handleSelectCard = (card) => {
        setSelectedCard(card);
        setOpenCardDialog(true);
    };

    const handleCloseCardDialog = () => {
        setOpenCardDialog(false);
        setSelectedCard({});
    };

    const handleGoToGameDrawer = () => {
        let gameDrawerUrl = match.url

        if (gameDrawerUrl[gameDrawerUrl.length - 1] === '/' ||
          gameDrawerUrl[gameDrawerUrl.length - 1] === '\\') {
            gameDrawerUrl += 'game-drawer';
          } else {
            gameDrawerUrl += '/game-drawer';
          }
        window.open(gameDrawerUrl);
    };

    const handleSimulateCard = () => {
        setPickedCells('get-picked-cells', {roomId});
    };

    useEffect(() => {
      if (cookies.loginToken) {
        setClassicGameAdmin("get-player-all", { roomId });
      }
    }, [cookies]);
    
    useEffect(() => {
        setFilteredList(players);
      }, [players]);

      useEffect(()=> {
        document.title = 'BINGO! Admin';
        if (cookies.userInfo && cookies.userInfo.userId === 'admin'){
            setPickedCells('get-picked-cells', {roomId});
        };
      }, [])

    return (
        <Grid container direction='column' justify='center' alignItems='center' spacing={2} className={classes.root}>
        <Grid item md={6} sm={10} xs={12}>
    <Paper classes={{root: classes.paperRoot}}>
        <Grid container direction='column' justify='center' alignItems='center' spacing={2}>
            <Grid item>
                <Typography variant='h3'>Room {roomId} Game Master</Typography>
            </Grid>
            {!cookies.loginToken ? 
                <Grid item>
                    <form onSubmit={handleAdminLogin}>
                    <Grid container direction='row' spacing={1} justify='center' alignItems='center'>
                        <Grid item md={6} sm={12}>
                            <TextField variant='outlined' label='Password' name='password' type='password' margin="dense" fullWidth/>
                        </Grid>
                        <Grid item md={2} sm={12}>
                            <Button variant='contained' type='submit' fullWidth>Login</Button>
                        </Grid>
                    </Grid>
                    </form>
                </Grid>
            :
            <React.Fragment>
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
                    <Button variant='contained' onClick={handleGoToGameDrawer} >Game Draw</Button>
                </Grid>
            </React.Fragment>
            }
        </Grid>
    </Paper>
    </Grid>
    <Grid item xs={12}>
        <form onSubmit={handleSearch}>
            <Grid container direction='row' spacing={1} alignItems='center'> 
                <Grid item>
                    <CssTextField
                        label="Search Player"
                        variant="outlined"
                        size='small'
                        id="custom-css-outlined-input"
                        name='searchText'
                    />
                </Grid>
                <Grid item>
                    <Button type='submit' variant='contained' fullWidth>Search</Button>
                </Grid>
            </Grid>  
        </form>
    </Grid>
    {filteredList.map(item => (
        <Grid item  md={8} sm={12} xs={12} key={`${item.player.id}-deck-view`} className={classes.deckViewGrid} >
            <PlayerDeckView 
                items={item.cards} 
                playerInfo={item.player} 
                onSelectCard={handleSelectCard} 
                />
        </Grid>
    ))}
    <Dialog open={openCardDialog} onClose={handleCloseCardDialog}>
        <DialogContent>
            <CardView items={selectedCard.cells} cardId={selectedCard.id} pickedCells={pickedCells} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseCardDialog}>Close</Button>
            <Button variant='contained' onClick={handleSimulateCard}>Refresh</Button>
        </DialogActions>
    </Dialog>
    <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
    </Backdrop>
    </Grid>
    )
  }

  export default ClassicAdmin;