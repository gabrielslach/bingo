import React, {useState} from 'react'

import {Paper, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        fontSize: '2em',
        padding: theme.spacing(1),
        maxWidth: '9em',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& table, th, td': {
            border: '1px solid black',
            borderCollapse: 'collapse',
            padding: '0 0.3em',
            textAlign: 'center',
            height: '1.75em'
        },
        '& table': {
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        '& td': {
            cursor: 'pointer'
        },
    },
    sub2: {
        marginTop: theme.spacing(1),
        textAlign: 'right'
    }
}))


const Row = (props) => {
    const {items = [], selected = false, onSelectItem} = props;
    return(
    <tr>
        {items.map((item, index)=>(
            <td key={`td-${index}`} style={{backgroundColor:selected.includes(item) ? 'rgba(255,248,6,0.5': ''}} onClick={()=>onSelectItem(item)}>
                {item}
            </td>
        ))}
    </tr>
)}

function Card(props) {
    const {items=[], cardId = ''} = props;
    const classes = useStyles();

    const [selected, setSelected] = useState([])

    const handleSelectItem = (item) => {
        const selected_copy = [...selected];
        if (selected.includes(item)) {
            const index = selected_copy.indexOf(item)
            selected_copy.splice(index,1)
        } else {
            selected_copy.push(item)
        }

        setSelected(selected_copy)
    }

    return(
        <Paper classes={{root: classes.root}} >
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
                    <Row items={item} selected={selected} onSelectItem={handleSelectItem} key={`row-${index}`} />
                ))}
                </tbody>
            </table>
            <Typography variant='subtitle2' className={classes.sub2}>Card No: <b>{cardId}</b></Typography>
        </Paper>
    )
}

export default Card;