import './App.css';

import React, {useState} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

import { CookiesProvider } from 'react-cookie';

import Dashboard from './pages/Dashboard';
import CreateRoom from './pages/CreateRoom';
import Lobby from './pages/Lobby';
import ClassicAdmin from './pages/Classic/Admin';
import ClassicDeckView from './pages/Classic/DeckView';
import ClassicDeckViewLogin from './pages/Classic/DeckViewLogin';
import ClassicGameDrawer from './pages/Classic/GameDrawer';
import LandingPage from './pages/LandingPage';
import GettingStarted from './pages/GettingStarted';

function Home() {
  const [roomID, setRoomID] = useState(null) //create custom hook once grew
  return (
    <>
      {roomID === null && <CreateRoom setRoomID={setRoomID}/>}
      {roomID !== null && <Dashboard roomID={roomID}/>}
      </>
  );
}

function AdminRouter(props) {
  const {roomId} = props;
  const match = useRouteMatch();
  return (
    <Switch>
    <Route path={`${match.path}/game-drawer`}>
      <ClassicGameDrawer roomId={roomId} />
    </Route>
    <Route path={`${match.path}/`}>
      <ClassicAdmin roomId={roomId} />
    </Route>
    </Switch>
  )
}

function GameRoom() {
  const {roomId} = useParams();
  const match = useRouteMatch();
  return (
    <React.Fragment>
      <a href='/' style={{textDecoration: 'none', color: 'rgba(255,255,255,0.3)', padding: '5px', float:'right',}}>BACK TO MAIN</a>
      <Switch>
        <Route path={`${match.path}/admin`}>
          <AdminRouter roomId={roomId}/>
        </Route>
        <Route path={`${match.path}/:playerId`}>
          <ClassicDeckView roomId={roomId} />
        </Route>
        <Route path={`${match.path}/`}>
          <ClassicDeckViewLogin roomId={roomId} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

function ClassicBingo() {
  const match = useRouteMatch();
  return(
    <Switch>
      <Route path={`${match.path}/:roomId`}>
        <GameRoom/>
      </Route>
          <Route path='/'>
            <Redirect to={{pathname:'/'}}/>
          </Route>
    </Switch>
  )
}

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Switch>
          <Route path='/classic'>
            <ClassicBingo/>
          </Route>
          <Route path='/upsca'>
            <Redirect to={{pathname:'/classic/UPSCA'}}/>
          </Route>
          <Route path='/UPSCA'>
            <Redirect to={{pathname:'/classic/UPSCA'}}/>
          </Route>
          <Route path='/upsca-admin'>
            <Redirect to={{pathname:'/classic/UPSCA/admin'}}/>
          </Route>
          <Route path="/">
            <LandingPage/>
            <GettingStarted/>
          </Route>
        </Switch>
      </Router>
    </CookiesProvider>
  )
}

export default App;
