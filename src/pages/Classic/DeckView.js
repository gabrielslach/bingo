import React from 'react';

function DeckView(props) {
    const {roomId} = props;
    return (
      <h1>{roomId}</h1>
    )
  }

  export default DeckView;