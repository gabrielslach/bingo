import React, {useState, useEffect} from 'react'

import {Grid, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'

import {writeData} from '../firebaseFunctions';

import ListBox from './Dashboard/ListBox'
import Cards from './Dashboard/Cards'
import CardView from './Dashboard/CardView'
import NameDrawerView from './Dashboard/NameDrawerView'

const useStyles = makeStyles((theme)=>({
    root: {
        margin: theme.spacing(1),
        backgroundColor: 'gray',
    },
}))

const names_static = [
    'Tiffany',
    'Lucille',
    'Thomas',
    'Subhaan',
    'Sydney',
    'Lily',
    'Keeley',
    'Kristi',
    'Izaac',
    'Kayson',
    'Kamile',
    'Alishia',
    'Etienne',
    'Sahar',
    'Daniyal',
    'Pranav',
    'Isla',
    'Komal',
    'Sarina',
    'Aqib'
]

const cards_static = [
    [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],
    [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],
    [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]],
    [[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5],[1,2,3,4,5]]
]

const participant_me = 'Drix'

function Dashboard(props) {
    const classes = useStyles();

    const {roomID} = props;

    const [selectedCardIndex, setSelectedCardIndex] = useState('')
    const [cardOwners, setCardOwners] = useState({})
    const [cardProperties, setCardProperties] = useState({})
    const [pickedNames, setPickedNames] = useState([])
    const [names, setNames] = useState([])
    const [cards, setCards] = useState([])

    //temp
    const [newNameVal, setNewNameVal] = useState('')

    const handleSelectCard = (index) => {
        setSelectedCardIndex(index)
    }

    const handleBack = () => {
        setSelectedCardIndex('')
    }

    const handleUseCard = (index) => {
        const cardOwners_copy = {...cardOwners}
        if (!cardOwners_copy[participant_me]) {
            cardOwners_copy[participant_me] = [];
        };
        cardOwners_copy[participant_me].push(index);
        setCardOwners(cardOwners_copy);
    }

    const handleCancelOwnership = (cardIndex) => {
        const cardOwners_copy = {...cardOwners};
        const index = cardOwners_copy[participant_me].indexOf(cardIndex)
        if (index < 0) {
            return;
        }
        cardOwners_copy[participant_me].splice(index,1)
        setCardOwners(cardOwners_copy);
    }

    const handleAddName = (e) => {
        const names_copy = [...names];
        e.preventDefault();
        if (names_copy.includes(newNameVal)) {
            return;
        }
        names_copy.push(newNameVal)
        
        setNewNameVal('')
        setNames(names_copy)
    }


    useEffect(()=>{
        const cardProps_temp = {};
        Object.entries(cardOwners).forEach(([key,val])=>{
            val.forEach(item=> {
                cardProps_temp[item] = key;
            })
        });
        setCardProperties(cardProps_temp);
        //writeData();
    }, [cardOwners])

    useEffect(()=>{
        writeData(roomID,'gameData', {names, pickedNames})
    }, [names, pickedNames])

    useEffect(()=>{
        const numOfCards = 4;
        const cards_temp = [];
        let pickedNumbers = null;
        for (let i = 0; i < numOfCards; i++) {
            cards_temp.push([])
            pickedNumbers = [];
            for (let j = 0; j < 5; j++) {
                cards_temp[i].push([])
                for (let k = 0; k < 5; k++) {
                    let randomNum = null;
                    do {
                        randomNum = Math.random() * names_static.length;
                        randomNum = randomNum.toFixed(0);
                    } while((pickedNumbers.includes(randomNum) || names_static[randomNum] === '' || names_static[randomNum] === null || names_static[randomNum] === undefined) && pickedNumbers.length < names_static.length)
                    pickedNumbers.push(randomNum)
                    cards_temp[i][j].push(names_static[randomNum]);
                }
            }
        }
        setCards(cards_temp);
    },[names])

    return(
        <Grid container direction='row' spacing={2} justify='center' className={classes.root}>
            <Grid item xs={10} sm={3} md={2}>
                <ListBox items={names} listName={`Room ${roomID} Participants`}/>
            </Grid>
            <Grid item xs={10} sm={3} md={2}>
                <ListBox items={names} listName='Items List'/>
            </Grid>
            <Grid item xs={10} sm={3} md={2}>
                <ListBox items={pickedNames} listName='Picked Items'/>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
                <NameDrawerView names={names} pickedNames={pickedNames} setPickedNames={setPickedNames} />
            </Grid>
            {selectedCardIndex === '' ? 
                <Grid item xs={12} sm={6} md={8}>
                    <Cards items={cards} onSelectCard={handleSelectCard} cardProperties={cardProperties}/>
                </Grid>
            :
                <Grid item xs={12} sm={6} md={8}>
                    <CardView
                        items={cards[selectedCardIndex]}
                        index={selectedCardIndex} 
                        onBack={handleBack} 
                        onUseCard={handleUseCard} 
                        onCancelOwnership={handleCancelOwnership} 
                        cardOwner={cardProperties[selectedCardIndex]}
                        participant_me={participant_me}
                    />
                </Grid>
            }
            <Grid item><TextField label='Participant Name' margin='dense'/><Button>Set</Button></Grid>
            <Grid item><form onSubmit={handleAddName}><TextField label='New Item' margin='dense' value={newNameVal} onChange={e => {setNewNameVal(e.target.value)}} /><Button onClick={handleAddName} >Set</Button></form></Grid>
        </Grid>
    )
}

export default Dashboard;
