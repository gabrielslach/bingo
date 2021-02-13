import React, {useState} from 'react'

import {Paper, Button} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    root: {
        fontSize: '2.5em',
        padding: theme.spacing(1),
        maxWidth: '6.7em',
        marginLeft: 'auto',
        marginRight: 'auto',
        '& table, th, td': {
            border: '1px solid black',
            borderCollapse: 'collapse',
            padding: '0 0.3em'
        },
        '& table': {
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        '& td': {
            cursor: 'pointer'
        },
    },
    
}))


const Row = (props) => {
    const {items = [], selected = false, onSelectItem} = props;
    return(
    <tr>
        {items.map((item, index)=>(
            <td key={`td-${index}`} style={{backgroundColor:selected.includes(item) ? 'rgba(300,0,0,0.1': ''}} onClick={()=>onSelectItem(item)}>
                {item}
            </td>
        ))}
    </tr>
)}

function Card(props) {
    const {items=[], onBack, onUseCard,onCancelOwnership, index, cardOwner='', participant_me=''} = props;
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
            {cardOwner === ''? 
            <React.Fragment>
                <Button onClick={()=>onBack()}>Back</Button>
                <Button variant='outlined' onClick={()=>onUseCard(index)}>Use this Card</Button>
            </React.Fragment>
            :
            <React.Fragment>
                {
                cardOwner === participant_me ?<Button variant='outlined' onClick={()=>onCancelOwnership(index)}>Cancel</Button>:
                <Button onClick={()=>onBack()}>Back</Button>
                }
            </React.Fragment>
            }
        </Paper>
    )
}

export default Card;