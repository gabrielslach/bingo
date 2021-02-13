import './App.css';

import React, {useState} from 'react'

import Dashboard from './pages/Dashboard'
import CreateRoom from './pages/CreateRoom'

function App() {
  const [roomID, setRoomID] = useState(null) //create custom hook once grew
  return (
    <>
      {roomID === null && <CreateRoom setRoomID={setRoomID}/>}
      {roomID !== null && <Dashboard roomID={roomID}/>}
      </>
  );
}

export default App;
