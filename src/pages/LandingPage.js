import React, {useState} from 'react';

import {AppBar, Toolbar, Typography, Button, Grid, Tooltip, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import DialogScaffold from './Classic/CommonComponents/DialogScaffold';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        height: '100vh',
        background: 'linear-gradient(90deg, white 60%, #18191F 40%)',
        position:'relative',
        overflow:'hidden',
        minWidth: '1095px'
    },
    appbarRoot: {
        flexGrow: 1
    },
    title: {
        fontFamily:"'Manrope', sans-serif",
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#00A0FF',
        paddingRight: theme.spacing(2),
        cursor: 'pointer'
    },
    leftSection: {
        width: 'fit-content'
    },
    padding: {
        flexGrow: 1
    },
    primaryBtn: {
        backgroundColor: '#8C30F5',
        color: 'white',
        '&:hover': {
            backgroundColor: '#5249af'
        }
    },
    secondaryBtn: {
        backgroundColor: '#F1E4FF',
        color: '#8C30F5'
    },
    leftBtn: {
        marginRight: theme.spacing(2)
    },
    rightBtn: {
        marginRight: theme.spacing(10)
    },
    btn: {
        fontFamily:"'Manrope', sans-serif",
        fontSize: '14px',
        fontWeight: 'bold'
    },
    mainTitle: {
        position: 'absolute',
        top: '35%',
        left: '10%',
        '& h1': {
            fontSize: '72px',
            fontWeight:'800',
            fontFamily:"'Manrope', sans-serif",
        },
        '& p': {
            fontSize: '18px',
            fontFamily:"'Manrope', sans-serif",
            marginBottom: theme.spacing(3),
            marginTop: theme.spacing(1)
        },
        '& span': {
            textTransform: 'capitalize',
            fontSize: '18px'
        }
    },
    outlinedBtn: {
        borderColor: '#8C30F5',
        color: '#8C30F5'
    },
    circles: {
        position: 'absolute',
        left: '56%'
    },
    circlePrim: {
        position: 'absolute',
        borderRadius: '100%',
        backgroundColor: 'green',
        color: 'rgb(0,0,0,0.3)',
        width: 'fit-content',
        padding: theme.spacing(3),
        '& p': {
            textAlign: 'center',
            fontFamily: "'Bangers', cursive"
        }
    },
    '@keyframes purpleAnim': {
        '0%': {
            top: '160px',
            left: '0'
        },
        '33%': {
            top: '170px',
            left: '3px'
        },
        '66%': {
            top: '155px',
            left: '-3px'
        },
        '100%': {
            top: '160px',
            left: '0px'
        }
    },
    purple: {
        top: '160px',
        backgroundColor: '#7668FB',
        boxShadow: '5px 5px #4238ab',
        width: '128px',
        height: '128px',
        animationName: `$purpleAnim`,
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        '& p': {
            lineHeight: '128px',
            fontSize: '7em'
        }
    },
    '@keyframes yellowAnim': {
        '0%': {
            top: '50px',
            left: '260px'
        },
        '30%': {
            top: '40px',
            left: '250px'
        },
        '100%': {
            top: '50px',
            left: '260px'
        }
    },
    yellow: {
        top: '50px',
        left: '260px',
        backgroundColor: '#FDC228',
        boxShadow: '7px 7px #b1871c',
        width: '190px',
        height: '190px',
        animationName: `$yellowAnim`,
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        '& p': {
            lineHeight: '190px',
            fontSize: '8.5em'
        }
    },
    '@keyframes greenAnim': {
        '0%': {
            top: '400px',
            left: '90px'
        },
        '10%': {
            top: '405px',
            left: '100px'
        },
        '70%': {
            top: '395px',
            left: '95px'
        },
        '100%': {
            top: '400px',
            left: '90px'
        }
    },
    green: {
        top: '400px',
        left: '90px',
        backgroundColor: '#9CC576',
        boxShadow: '5px 5px #6d8a52',
        width: '105px',
        height: '105px',
        animationName: `$greenAnim`,
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        '& p': {
            lineHeight: '105px',
            fontSize: '5em'
        }
    },
    '@keyframes redAnim': {
        '0%': {
            top: '450px',
            left: '340px'
        },
        '50%': {
            top: '430px',
            left: '340px'
        },
        '100%': {
            top: '450px',
            left: '340px'
        }
    },
    red: {
        top: '450px',
        left: '340px',
        backgroundColor: '#F64561',
        boxShadow: '5px 5px #ac3044',
        width: '152px',
        height: '152px',
        animationName: `$redAnim`,
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        '& p': {
            lineHeight: '152px',
            fontSize: '6em'
        }
    },
    '@media screen and (max-width: 450px)': {
        root: {
            background: 'white',
            height: '140vh',
            minWidth: 0,
        },
        toolbarRoot: {
            display: 'block',
            textAlign: 'center'
        },
        appbarRoot: {
            backgroundColor: '#18191F',
            paddingBottom: theme.spacing(4),
            paddingTop: theme.spacing(3),
            color: 'white',
        },
        leftSection: {
            justifyContent: 'center'
        },
        btnHeader: {
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: theme.spacing(2),
            width: '100%'
        },
        circles: {
            left: '-20%',
            top: '30%',
            zIndex: 0,
            opacity: '60%'
        },
        mainTitle: {
            zIndex: 1,
            left: 0,
            textAlign: 'center',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        }
    }
}));

const LandingPage = props => {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = useState(false);
    const [roomId, setRoomID] = useState('');

    const handleGoToRoomConfirm = (e) => {
        if (e.target.roomId) {
            e.preventDefault();
            const e_roomId = e.target.roomId.value;
            window.location.assign(`/classic/${e_roomId}`);
            return;
        };

        window.location.assign(`/classic/${roomId}`);
    };

    const handleGoToRoomCancel = () => {
        setRoomID('');
    };

    const handleChangeRoomId = e => {
        setRoomID(e.target.value);
    }

    return(
        <div className={classes.root}>
            <AppBar position="static" elevation={0} color='transparent' className={classes.appbarRoot}>
                <Toolbar classes={{root: classes.toolbarRoot}}>
                    <Grid container direction='row' alignItems='center' className={classes.leftSection}>
                        <Grid item xs={12} sm>
                            <Typography variant="h6" className={classes.title}>
                            GABRIELSLACH
                            </Typography>
                        </Grid>
                        {/* <Grid item xs={12} sm>
                            <Button color="inherit" className={classes.btn} href='/classic/UPSCA'>UPSCA Bingo</Button>
                        </Grid> */}
                        {/* <Grid item>
                            <Tooltip title="I'm accepting commissions" aria-label="Hire Me">
                                <Button color="inherit" className={classes.btn} href='https://www.linkedin.com/in/gabdl-dev-mete/' target='_blank'>Hire Me</Button>
                            </Tooltip>
                        </Grid> */}
                        <Grid item >
                            <Tooltip title="Support this project" aria-label="Buy Me A Coffee">
                                <Button color="inherit" className={classes.btn} href="https://ko-fi.com/gabrielslach" target="_blank">Buy Me A Coffee</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <div className={classes.padding}/>
                    <Button variant='contained' className={`${classes.btn} ${classes.btnHeader} ${classes.leftBtn} ${classes.secondaryBtn}`} onClick={setOpenDialog}>Login</Button>
                    <Tooltip title='Create a Room'>
                        <Button variant='contained' className={`${classes.btn} ${classes.btnHeader} ${classes.rightBtn} ${classes.primaryBtn}`} href='#getting-started'>Create Room</Button>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <div className={classes.mainTitle}>
                <Typography variant='h1'>BINGO! Web</Typography>
                <Typography variant='body1'>
                    Playing BINGO in online meetings have never been much easier. <br/>
                    Welcome to BINGO! Web, create a room now to start playing!
                </Typography>
                <Tooltip title='Create a Room'>
                    <Button variant='contained' className={`${classes.btn} ${classes.leftBtn} ${classes.primaryBtn}`} href='#getting-started'>Get Started</Button>
                </Tooltip>
                <Button variant='outlined' className={`${classes.btn} ${classes.outlinedBtn}`} onClick={setOpenDialog}>Join a room</Button>
            </div>
            <div className={classes.circles}>
                <div className={`${classes.circlePrim} ${classes.purple}`}>
                    <Typography>B2</Typography>
                </div>
                <div className={`${classes.circlePrim} ${classes.yellow}`}>
                    <Typography>I29</Typography>
                </div>
                <div className={`${classes.circlePrim} ${classes.green}`}>
                    <Typography>N31</Typography>
                </div>
                <div className={`${classes.circlePrim} ${classes.red}`}>
                    <Typography>G48</Typography>
                </div>
            </div>
            <DialogScaffold 
                open={openDialog}
                setOpen={setOpenDialog}
                title='BINGO Room'
                contentText='What is your Room ID?'
                FieldsGrid={<form onSubmit = {handleGoToRoomConfirm}><TextField autoFocus fullWidth name='roomId' label='Room ID' placeholder='e.g. "A29O3"' value={roomId} onChange={handleChangeRoomId} /></form>}
                confirmText='Confirm'
                onConfirm={handleGoToRoomConfirm}
                onCancel={handleGoToRoomCancel}
                fullWidth={true}
                maxWidth='xs'
                />
        </div>
    );
};

export default LandingPage;