import React from 'react'

import {Paper, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        padding: theme.spacing(1),
        cursor: 'pointer',
        '& table, th, td': {
            border: '1px solid black',
            borderCollapse: 'collapse',
            padding: '0 0.25em',
            textAlign: 'center'
        },
        '&:hover': {
            backgroundColor: 'white',
            transform: 'scale(1.2)'
        },
    },
    
}))


const Row = ({items = []}) => (
    <tr>
        {items.map((item, index)=>(
            <td key={`td-${index}`}>{item}</td>
        ))}
    </tr>
)

function Card(props) {
    const {items=[], onSelectCard, cardId = ''} = props;
    const classes = useStyles();

    return(
        <Paper classes={{root: classes.root}} onClick={onSelectCard}>
            <Typography variant='subtitle2'>Card No: {cardId}</Typography>
            <table >
                <thead>
                <tr>
                    <th>B</th>
                    <th>I</th>
                    <th>N</th>
                    <th>G</th>
                    <th>O</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item, index)=>(
                    <Row items={item} key={`row-${index}`}/>
                ))}
                </tbody>
            </table>
        </Paper>
    )
}

export default Card;