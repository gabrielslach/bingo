import React, {useEffect, useState} from 'react';
import {
    useParams,
    useRouteMatch
  } from "react-router-dom";

  
import {Grid, Typography, Button} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import {ZoomIn as ZoomInIcon, ZoomOut as ZoomOutIcon} from '@material-ui/icons';

import CardView from './CardView'
import SelectCellDialog from './DeckView/SelectCellDialog';
import SelectCellChipArray from './DeckView/SelectCellChipArray';

import useClassicGameAdmin from '../../util/useClassicGameAdmin';
import usePlayerLogin from '../../util/usePlayerLogin';

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(2)
    },
    headers: {
        marginLeft: theme.spacing(1),
        color: 'white',
        textShadow: '0.07em 0.07em #d6a224',
    },
    clickableTypo: {
        textDecoration: 'underline',
        cursor: 'pointer',
        width: 'fit-content'
    },
    thinTypo: {
        textShadow: '0.05em 0.05em #d6a224',
    },
    scaleDownDiv: {
        transform: 'scale(0.6)',
        transformOrigin: '1vw 0',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    gridItemScaleDown: {
        height:'16em',
    },
    scaleDownDiv2: {
        transform: 'scale(0.3)',
        transformOrigin: '1vw 0',
        width: 'fit-content',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    gridItemScaleDown2: {
        height:'8em',
    }
}));

function DeckView(props) {
    const {roomId} = props;
    const match = useRouteMatch();

    const classes = useStyles();

    const {playerId} = useParams();
    
    const [cards = [], players = [], isLoading, setClassicGameAdmin ] = useClassicGameAdmin();
    const [cookies, isLoading2, setPlayerLogin] = usePlayerLogin();

    const [selectCellDialog, setSelectCellDialog] = useState(false);
    const [selectedChips, setSelectedChips] = useState([]);
    const [zoom, setZoom] = useState('in');

    const handleLogout = () => {
        setPlayerLogin('logout');
    };

    const handleAddChip = () => {
        setSelectCellDialog(true);
    };

    const handleAddCellConfirm = (numArr) => {
        setSelectedChips(
            (currentState) => {
                const currentState_ = [...currentState];
                numArr.forEach(item=>{
                    const parsedItem = parseInt(item);
                    if (!currentState.includes(parsedItem) && !isNaN(parsedItem)) {
                        currentState_.push(parsedItem);
                    };
                });
                return currentState_;
            }
        );
    };

    const handleZoom = () => {
        setZoom(
            (zoom) => zoom === 'in'? 'out': 'in'
        )
    }

    useEffect(()=> {
        if (cookies.loginToken) {
            setClassicGameAdmin('get-player', {playerId, roomId});
        } else {
            const rootPath = match.path.split('/:roomId/:playerId')[0]
            window.location.assign(`${rootPath}/${roomId}`)
        };
    }, [cookies]);
    
    return (
        <React.Fragment>
        <Grid container direction='row' alignItems = 'center' spacing={2} className={classes.root}>
            <Grid item className={classes.headers} xs={12} md={9}>
                <Typography variant='h6'><b>Welcome {players.name}!</b></Typography>
                <Typography variant='subtitle2' className={classes.thinTypo}>Player ID: {players.id}</Typography>
                <Typography variant='subtitle2' className={`${classes.clickableTypo} ${classes.thinTypo}`} onClick={handleLogout}>Logout</Typography>
                <br/>
                <Typography variant='subtitle1' className={classes.thinTypo}>Selected Cells:</Typography>
                <SelectCellChipArray chipData={selectedChips} setChipData={setSelectedChips} onAddChip={handleAddChip} />
                <br/>
                <Button size='small' variant='contained' onClick={handleZoom} startIcon={zoom === 'in'? <ZoomOutIcon/> : <ZoomInIcon/>}>{zoom === 'in'? 'Zoom Out' : 'Zoom In'}</Button>
                <br/>
            </Grid>
            <Grid item xs={12}>
                <Grid container direction='row' justify='flext-start' spacing={1}>
                {cards.map(item => (
                    <Grid item 
                        xs={zoom === 'in' ? 6 : 3} 
                        sm={zoom === 'in' ? 4 : 2} 
                        md={zoom === 'in' ? 3 : 2} 
                        lg={zoom === 'in' ? 2 : 1} 
                        xl={1}
                        key={`${playerId}-card-${item.id}`} 
                        className={zoom === 'in' ? classes.gridItemScaleDown : classes.gridItemScaleDown2}>
                        <div className={zoom === 'in' ? classes.scaleDownDiv : classes.scaleDownDiv2}>
                            <CardView items={item.cells} cardId={`${roomId}-${item.id}`} pickedCells={selectedChips} />
                        </div>
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
        <SelectCellDialog 
            open={selectCellDialog}
            setOpen={setSelectCellDialog}
            onConfirm={handleAddCellConfirm}
            />
        </React.Fragment>
    )
  }

  export default DeckView;