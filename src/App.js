import React from 'react';
import './App.css';

import * as firebase from "firebase/app";
import 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/analytics';

import CanvasDraw from "react-canvas-draw";

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoIcon from '@material-ui/icons/Undo';
import SaveIcon from '@material-ui/icons/Save';

var firebaseConfig = {
  apiKey: "AIzaSyADxgU6pKy-sqxGhPHkqAoW_VqG85VsQB8",
  authDomain: "spesa-2de52.firebaseapp.com",
  databaseURL: "https://spesa-2de52.firebaseio.com",
  projectId: "spesa-2de52",
  storageBucket: "spesa-2de52.appspot.com",
  messagingSenderId: "232880545893",
  appId: "1:232880545893:web:57cbf0ac1e002b3625a68c",
  measurementId: "G-K5TC2JJMH8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
    width: 250,
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  fullList: {
    width: 'auto',
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function BottomAppBar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <AppBar position="fixed" color="primary" className={useStyles().appBar}>
      <SwipeableTemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer}/>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer("left", true)}>
            <MenuIcon />
          </IconButton>
          {/* <Fab color="secondary" aria-label="add" className={useStyles().fabButton}>
            <AddIcon />
          </Fab> */}
          <div className={useStyles().grow} />
          <Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL} />
          <IconButton color="inherit" aria-label="logout" onClick={() => {firebase.auth().signOut()}}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  )
}

function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  let state = props.state;
  let toggleDrawer = props.toggleDrawer;

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <div className={classes.root}>
            <Avatar alt={firebase.auth().currentUser.displayName} src={firebase.auth().currentUser.photoURL} />
          </div>
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {['left'].map(anchor => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}

class Disegno extends React.Component {
  render() {
    return (
      <div>
        <Fab 
          color="secondary" 
          aria-label="save"
          style={{
            margin: 0,
            zIndex: 1,
            top: 'auto',
            right: 20,
            bottom: 200,
            left: 'auto',
            position: 'fixed',
          }}
          >
            <SaveIcon onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}/>
        </Fab>
        <Fab 
          color="secondary" 
          aria-label="undo"
          style={{
            margin: 0,
            zIndex: 1,
            // top: 'auto',
            right: 20,
            bottom: 140,
            left: 'auto',
            position: 'fixed',
          }}
          >
            <UndoIcon onClick={() => {
              this.saveableCanvas.undo();
            }}/>
        </Fab>
        <Fab 
          color="secondary" 
          aria-label="clear"
          style={{
            margin: 0,
            zIndex: 1,
            top: 'auto',
            right: 20,
            bottom: 80,
            left: 'auto',
            position: 'fixed',
          }}
          >
            <DeleteIcon onClick={() => {
              this.saveableCanvas.clear();
            }}/>
        </Fab>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
          style={{
            width: window.innerWidth - 80,//"95%",
            height: window.innerHeight - 65, //"100vh",
            zIndex: -1,
            // height: "40%"
            // boxShadow:
            //   "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
          }}
        />
        </div>
    );
  }
}


class SignInScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <Grid
            container
            spacing={5}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
          >

            <Grid item xs={12}>
              <Typography variant="h1" component="h2">
              Arte tutti insieme
              </Typography>
            </Grid>  
            <Grid item xs={12}>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </Grid>   
          </Grid>
          
        </div>
      );
    }
    return (
      <div>
        {/* <p>Benvenuto {firebase.auth().currentUser.displayName}</p> */}
        <BottomAppBar />
        <Disegno />
      </div>
    );
  }
}

function App() {
  return (
      <div>
        <SignInScreen />
      </div>
    );
}

export default App;
