import './App.css';

import React, {useState} from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Dashboard from './pages/Dashboard'
import CreateRoom from './pages/CreateRoom'
import Lobby from './pages/Lobby'
import ClassicAdmin from './pages/Classic/Admin'
import ClassicDeckView from './pages/Classic/DeckView'

function Home() {
  const [roomID, setRoomID] = useState(null) //create custom hook once grew
  return (
    <>
      {roomID === null && <CreateRoom setRoomID={setRoomID}/>}
      {roomID !== null && <Dashboard roomID={roomID}/>}
      </>
  );
}

function GameRoom() {
  const {roomId} = useParams();
  const match = useRouteMatch();
  return (
  <Switch>
    <Route path={`${match.path}/admin`}>
      <ClassicAdmin roomId={roomId} />
    </Route>
    <Route path={`${match.path}`}>
      <ClassicDeckView roomId={roomId} />
    </Route>
  </Switch>);
}

function ClassicBingo() {
  const match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.path}/:roomId`}>
        <GameRoom/>
      </Route>
      <Route path={`${match.path}/`}>
        <Lobby/>
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/classic'>
          <ClassicBingo/>
        </Route>
        <Route path="/">
          {/* <Home/> */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
