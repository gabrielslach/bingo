import React, {useState, useEffect} from 'react'

import {Paper, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        fontSize: '2em',
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
        color: 'white',
        backgroundColor: '#1e7573',
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
            backgroundColor: 'white',
            color: 'black',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        '& td': {
            cursor: 'pointer'
        },
        '& h6': {
            fontFamily: "'Montserrat', sans-serif !important"
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
    const {items=[], cardId = '', pickedCells=[]} = props;
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

    useEffect(()=>{
        if (pickedCells.length > 0) {
            setSelected(pickedCells);
        };
    }, [pickedCells])

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