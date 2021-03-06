import React, {useState} from 'react'

import {Grid, Typography, Paper, Button} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {
    Delete as DeleteIcon, 
    NoteAdd as NoteAddIcon,
    RemoveCircleOutline as RemoveCircleOutlineIcon
} from '@material-ui/icons/';

import Card from './Card'

const useStyles = makeStyles((theme)=>({
    gridRoot: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
    paperRoot: {
        //backgroundColor: 'rgba(0,0,0,0)',
        backgroundColor: '#d6a224',
        padding: theme.spacing(2),
        borderColor: 'rgba(255,255,255,0.3)',
        '& h5': {
            color: 'white',
            textShadow: '2px 2px 4px #000000'
        },
    },
    infoPaper: {
        marginTop: theme.spacing(1),
        backgroundColor: 'white',
        width: '40vh',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderRadius: '2vh',
        boxShadow: '2px 2px 4px #000000'
    },
    showBtn: {
        backgroundColor: 'white',
        borderRadius: '2vh',
        marginTop: theme.spacing(1),
    },
    linkBtn: {
        cursor: 'pointer'
    },
    leftBtn: {
        marginRight: theme.spacing(1)
    },
    btn: {
        marginTop: theme.spacing(1)
    },
    noteTxt: {
        color: 'white',
        fontSize: '0.6em'
    }
}))

function PlayerDeckView(props) {
    const {
        items = [], 
        onSelectCard = () => {}, 
        playerInfo = {}, 
        showPasswordProp = false,
        onDeleteCard,
        onDeletePlayer,
        onAddCard,
        roomId=''
    } = props;
    const classes = useStyles();

    const [showPlayerInfo, setShowPlayerInfo] = useState(false);
    
    const {id, name, email} = playerInfo;

    const toggleShowDetails = () => {
        setShowPlayerInfo(!showPlayerInfo)
    }
    
    return(
        <Paper className={classes.paperRoot}>
            <Grid container direction='row' justify='space-between' alignItems='center' >
                <Grid item>
                    <Typography variant='h5'>{id} <b>{name}'s Deck</b></Typography>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        className={`${classes.leftBtn} ${classes.btn}`}
                        startIcon={<NoteAddIcon />}
                        size='small'
                        onClick={()=>onAddCard(id, name)}
                    >
                        Add Cards
                    </Button>
                    <Button
                        variant="contained"
                        className={`${classes.leftBtn} ${classes.btn}`}
                        startIcon={<DeleteIcon />}
                        size='small'
                        onClick={()=>onDeleteCard(id, name)}
                    >
                        Delete Card
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={`${classes.btn}`}
                        startIcon={<RemoveCircleOutlineIcon />}
                        size='small'
                        onClick={()=>onDeletePlayer(id, name)}
                    >
                        Delete Player
                    </Button>
                </Grid>
            </Grid>
            <Typography variant='subtitle2' className={classes.noteTxt}>The player ID is {id}, give this to the player together with the Room ID.</Typography>
            {(showPasswordProp || showPlayerInfo) ?
                <Paper className={classes.infoPaper}>
                    <Grid container direction='row' justify='space-between' >
                        <Grid item>
                            <Typography variant='subtitle2'>
                                Email: <b>{email.length ? email : '-'}</b>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='subtitle2' onClick={toggleShowDetails} className={classes.linkBtn} ><u>HIDE</u></Typography>
                        </Grid>
                    </Grid>
                </Paper>
                :
                <Button variant="contained" size='small' className={classes.showBtn} onClick={toggleShowDetails} >Show Details</Button>
            }
            <Grid container direction='row' spacing={1} className={classes.gridRoot}>
                {items.map((item,index)=>
                    <Grid item key={`cards-${index}`}>
                        <Card items={item.cells} onSelectCard={()=>onSelectCard(item)} cardId={`${roomId}-${item.id}`} />
                    </Grid>
                )}
            </Grid>
        </Paper>
    )
}

export default PlayerDeckView;