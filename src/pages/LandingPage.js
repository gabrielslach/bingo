import React from 'react';

import {AppBar, Toolbar, Typography, Button, Grid, Tooltip} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        height: '100%',
        background: 'linear-gradient(90deg, white 60%, #18191F 40%)',
        position:'relative',
        minWidth: '1095px',
        minHeight: '500px',
        overflow:'hidden'
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
        flexGrow: 1,
        width: 'fit-content'
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
    }
}));

const LandingPage = props => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static" elevation={0} color='transparent' className={classes.appbarRoot}>
                <Toolbar>
                    <Grid container direction='row' alignItems='center' className={classes.leftSection}>
                        <Grid item>
                            <Typography variant="h6" className={classes.title} onClick={()=>{window.open('http://gabrielslach.me')}}>
                            GABRIELSLACH.ME
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button color="inherit" className={classes.btn} href='/classic/UPSCA'>UPSCA Bingo</Button>
                        </Grid>
                        {/* <Grid item>
                            <Tooltip title="I'm accepting commissions" aria-label="Hire Me">
                                <Button color="inherit" className={classes.btn} href='https://www.linkedin.com/in/gabdl-dev-mete/' target='_blank'>Hire Me</Button>
                            </Tooltip>
                        </Grid> */}
                        <Grid item>
                            <Tooltip title="Support this project" aria-label="Buy Me A Coffee">
                                <Button color="inherit" className={classes.btn} href="https://ko-fi.com/gabrielslach" target="_blank">Buy Me A Coffee</Button>
                            </Tooltip>
                        </Grid>
                    </Grid>
                    <Button variant='contained' className={`${classes.btn} ${classes.leftBtn} ${classes.secondaryBtn}`} href='/classic/UPSCA'>Login</Button>
                    <Tooltip title='Coming soon'>
                        <Button variant='contained' className={`${classes.btn} ${classes.rightBtn} ${classes.primaryBtn}`}>Create Room</Button>
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
                <Button variant='outlined' className={`${classes.btn} ${classes.outlinedBtn}`} href='/classic/UPSCA'>UPSCA Bingo</Button>
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
        </div>
    );
};

export default LandingPage;