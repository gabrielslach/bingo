import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {Chip, Paper, IconButton, Typography} from '@material-ui/core';
import {PlaylistAdd as PlaylistAddIcon} from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    maxWidth: '700px'
  },
  chip: {
    margin: theme.spacing(0.5),
    color: 'black',
    textShadow: 'none',
    fontWeight: 'bold'
  },
  placeholder: {
    margin: theme.spacing(0.5),
    color: 'rgba(0,0,0,0.3)',
    textShadow: 'none',
    paddingTop: theme.spacing(0.5),
  }
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  const {chipData, setChipData, onAddChip} = props;

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Paper component="ul" className={classes.root}>
      {chipData.length < 1 && <Typography className={classes.placeholder}>Click <PlaylistAddIcon fontSize="small"/> to add a number.</Typography>}
      {chipData.map((data) => {
        return (
          <li key={`${data}-chip`}>
            <Chip
              label={data}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}
      <li>
        <IconButton aria-label="delete" className={classes.margin} onClick={onAddChip}>
          <PlaylistAddIcon fontSize="small" />
        </IconButton>
    </li>
    </Paper>
  );
}
