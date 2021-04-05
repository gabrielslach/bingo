import React, {createRef} from 'react';

import {makeStyles} from '@material-ui/core/styles';
import {Typography, Button, TextField, Grid, Backdrop, CircularProgress} from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import ReCAPTCHA from "react-google-recaptcha";

import useCreateRoom from '../util/useCreateRoom';

const useStyles = makeStyles(theme=> ({
    root: {
        width: '100%',
        height: '100vh',
        minWidth: '1095px',
        minHeight: '500px',
        backgroundColor: '#8C30F5',
        position: 'relative',
        overflow: 'hidden',
        '& svg': {
            zIndex: 0
        }
    },
    '@keyframes svg1Anim': {
        '50%': {
            transform: 'translateX(-5px)'
        },
    },
    '@keyframes svg2Anim': {
        '0%': {
        },
        '50%': {
            transform: 'scale(2.5) rotate(-30deg) translate(300px,14px)'
        },
        '100%': {
        },
    },
    svg1: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        transform: 'scale(2.5)',
        animationName: '$svg1Anim',
        animationDuration: '30s',
        animationIterationCount: 'infinite'
    },
    svg2: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        transform: 'scale(2.5) rotate(-30deg) translate(150px,7px)',
        transformOrigin: 'bottom right',
        animationName: '$svg2Anim',
        animationDuration: '20s',
        animationIterationCount: 'infinite'
    },
    main: {
        position: 'absolute',
        top: '50%',
        left: '45%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        zIndex: 1
    },
    picture: {
        width: '500px',
        height: '500px',
        transform: 'translateY(40px)'
    },
    textArea: {
        '& h3': {
            fontFamily:"'Manrope', sans-serif",
            fontWeight: 'bold',
            fontSize: '40px',
            color: 'white',
            marginBottom: theme.spacing(4)
        },
        '& button': {
            fontFamily:"'Manrope', sans-serif",
            marginRight: theme.spacing(1),
            marginTop: '2px',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
                backgroundColor: '#F1E4FF',
                color: '#8C30F5'
            }
        },
    },
    textField: {
        backgroundColor: 'white',
        borderRadius: '5px',
        '& label': {
            backgroundColor: 'white'
        }
    },
    backdrop: {
        zIndex: 10
    }
}));

function GettingStarted(props) {
    const classes = useStyles();
    const recaptchaRef = createRef();

    const [roomDetails, isLoading, setCreateRoom] = useCreateRoom();

    const handleCreateRoom = async () => {
        const captchaToken = await recaptchaRef.current.executeAsync();
        if (captchaToken) {
            setCreateRoom('create-room', {captchaToken});
        };
    };

    return(
        <div className={classes.root} id='getting-started'>
            <Grid container direction='row' spacing={3} alignItems='center' className={classes.main}>
                <Grid item className={classes.pictureDiv}>
                    <img className={classes.picture} alt='getting-started' src='roleta.png'/>
                </Grid>
                <Grid item className={classes.textArea}>
                    <Typography variant='h3'>
                        Create a BINGO room<br/> to get started.
                    </Typography>
                    <Button variant='contained' onClick={handleCreateRoom} disabled={isLoading || roomDetails.length > 0}>
                        { roomDetails.length > 0 ?
                            <CheckCircleOutlineIcon/>
                            :'Create Room'
                        }
                        </Button>
                    <TextField 
                        className={classes.textField} 
                        variant='outlined' size='small' 
                        InputProps={{readOnly: true}} 
                        value={roomDetails} 
                        multiline
                        rowsMax={6}
                        label={
                            roomDetails.length > 0 ?
                            '-Room Credentials-'
                            : null
                        }
                        helperText={
                            roomDetails.length > 0 ?
                            'Copy and store these credentials. To access the room, go to the Room URL.'
                            : null
                            }
                        />
                </Grid>
            </Grid>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={classes.svg1}>
                <path fill="rgba(255,255,255,0.1)"
                d="M0,224L30,234.7C60,245,120,267,180,250.7C240,235,300,181,360,149.3C420,
                117,480,107,540,101.3C600,96,660,96,720,101.3C780,107,840,117,900,101.3C960,
                85,1020,43,1080,42.7C1140,43,1200,85,1260,90.7C1320,96,1380,64,1410,48L1440,
                32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,
                320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420
                ,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
                </path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className={classes.svg2}>
                <path fill="rgba(255,255,255,0.1)" d="M0,320L34.3,314.7C68.6,309,137,299,206,
                288C274.3,277,343,267,411,234.7C480,203,549,149,617,133.3C685.7,117,754,139,823,
                128C891.4,117,960,75,1029,80C1097.1,85,1166,139,1234,138.7C1302.9,139,1371,85,
                1406,58.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,
                1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,
                480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path>
            </svg>
            <Backdrop className={classes.backdrop} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey="6Lcm_ZsaAAAAAJZOn6tskga16iLhmgWwiyK11WPe"
            />
        </div>
    );
};

export default GettingStarted;