import React, {useEffect, useState} from 'react';

import {Grid, Button, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import useGameDrawer from '../../util/useGameDrawer';

const bingo = {
    B: [1,15],
    I: [16, 30],
    N: [31,45],
    G: [46,60],
    O: [61,75],
}

const useStyles = makeStyles(theme=> ({
    gridRoot: {
        minHeight: '105%'
    },
    roundPaper: {
        width: '80px',
        height: '80px',
        borderRadius: '100%',
    },
    centeredTypography: {
        textAlign: 'center',
        paddingTop: '25px'
    },
    h1Typography: {
        fontSize: '15em',
        color: 'white',
        textShadow: '2px 2px 4px #000000'
    },
    h5Typography: {
        color: 'white',
        textShadow: '2px 2px 4px #000000',
        paddingTop: theme.spacing(3)
    }
}));

const GameDrawer = props => {
    const {roomId} = props;
    const classes = useStyles();

    const [pickedCells, setPickedCells] = useGameDrawer();
    const [letter, setLetter] = useState('');
    const [number, setNumber] = useState(0);
    const [intervalId, setIntervalId] = useState(NaN);
    const [isWaiting, setIsWaiting] = useState(false);
    const [pickedCellsForDisplay, setPickedCellsForDisplay] = useState([]);

    const getLetter = number_ => {
        switch (true) {
            case (number_ < 16):
                return('B')
                break;
            case (number_ < 31):
                return('I')
                break;
            case (number_ < 46):
                return('N')
                break;
            case (number_ < 61):
                return('G')
                break;
            case (number_ <= 75):
                return('O')
                break;
            default:
                break;
        };
    };

    const handleDrawNumber = () => {
        setPickedCells('pick-cell', {roomId});
        const rangeStart = 1;
        const rangeEnd = 75;

        setIsWaiting(true);
        const intervalId_ = setInterval(() => {
            const randomFloat = Math.random();
            setNumber(Math.floor(randomFloat * (rangeEnd - rangeStart)) + rangeStart);
        }, 50);
        setIntervalId(intervalId_);
    };

    useEffect(()=> {
        if (!isNaN(intervalId)) {
            setTimeout(() => {
                clearInterval(intervalId);
                setNumber(pickedCells[pickedCells.length - 1]);
                setIsWaiting(false);

                const pickedCells_ = [...pickedCells];
                pickedCells_.reverse();
                setPickedCellsForDisplay(pickedCells_);
            }, 2000);
        } else {
            const pickedCells_ = [...pickedCells];
            pickedCells_.reverse();
            setPickedCellsForDisplay(pickedCells_);
        }
    }, [pickedCells]);

    useEffect(()=>{
        if (number > 0) {
            const letter_ = getLetter(number);
            setLetter(letter_);
        }
    }, [number]);
    
    useEffect(()=> {
        setPickedCells('get-picked-cells', {roomId});
        document.title = 'BINGO! Picker';
    }, []);

    return(
        <Grid container direction='column' alignItems='center' spacing={4} className={classes.gridRoot}>
            <Grid item>
                <Typography variant='h5' className={classes.h5Typography}>
                    Classic Bingo - Room {roomId}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='h1' className={classes.h1Typography}>
                    {letter} {number > 0 && number}
                </Typography>
            </Grid>
            <Grid item>
                <Button 
                    variant='outlined' 
                    onClick={handleDrawNumber} 
                    disabled={isWaiting || pickedCells.length === 75} 
                    >
                    {pickedCells.length === 75 ? 'All numbers picked.' : 'Draw Number'}</Button>
            </Grid>
            <Grid item>
                <Grid container direction='row' spacing={2} justify='flex-start'>
                    {pickedCellsForDisplay.map(item=> {
                        const letter_ = getLetter(item);
                        return (
                            <Grid item key={`${item}-ball-grid`}>
                                <Paper elevation={3} className={classes.roundPaper}>
                                    <Typography variant='h5' className={classes.centeredTypography}>{letter_} {item}</Typography>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GameDrawer;