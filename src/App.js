import React, { useState, useCallback } from 'react';
import './App.css';

import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui'
import 'firebaseui'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/analytics';
import '@firebase/firestore'
import { GeoFirestore } from 'geofirestore';

import { geolocated } from "react-geolocated";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import Popup from "reactjs-popup";
import CanvasDraw from "react-canvas-draw";
import { GithubPicker } from 'react-color';
import { isMobile } from "react-device-detect";

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, makeStyles, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

import ColorizeIcon from '@material-ui/icons/Colorize';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UndoIcon from '@material-ui/icons/Undo';
import SaveIcon from '@material-ui/icons/Save';
import ImageIcon from '@material-ui/icons/Image';
import MapIcon from '@material-ui/icons/Map';

import banner from './banner_donazione.svg';
import logo from './logo.svg';

const puntoSpeciale = [45.4642, 9.1900];

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

let theme = createMuiTheme({
  palette: {
    background: {
      default: "#315190"
    },
    primary: { main: '#315190' },
    secondary: { main: '#40bd47' },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    h2: {
      color: "#fed111"
    },
    h1: {
      color: "#fed111"
    },
    h5: {
      color: "white"
    },
    fontFamily: "'Baloo Da 2', cursive",
  }
});
theme = responsiveFontSizes(theme);

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
  media: {
    height: 140,
  },
  footer: {
    top: 'auto',
    bottom: 0,
    shadows: ["none"],
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function BottomAppBar(props) {
  var displayName = "Anonimo";
  if (firebase.auth().currentUser.displayName) {
    displayName = firebase.auth().currentUser.displayName;
  }
  var photoUrl = undefined;
  if (firebase.auth().currentUser.photoURL) {
    photoUrl = firebase.auth().currentUser.photoURL;
  }
  return (
    <AppBar position="fixed" color="primary" className={useStyles().appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => { props.handleChange() }}>
          <ImageIcon />
        </IconButton>
        <Button
          onClick={() => { window.open("https://donazioni.cri.it/donazioni/dona-per-emergenza-coronavirus") }}
          color='inherit'
          style={{
            left: 20
          }}
        >
          <Typography>
            Dona ora!
          </Typography>
        </Button>
        <div className={useStyles().grow} />
        <Avatar alt={displayName} src={photoUrl} >A</Avatar>
        <IconButton color="inherit" aria-label="logout" onClick={() => { firebase.auth().signOut() }}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

function LocationOk(props) {
  let testo = "Salvataggio completato."
  let latitude, longitude;
  if (!props.isGeolocationAvailable || !props.isGeolocationEnabled) {
    testo = "Salvataggio completato, abilita il gps per salvare il disegno nella tua posizione sul murales."
  }
  if (props.coords == null) {
    latitude = puntoSpeciale[0];
    longitude = puntoSpeciale[1];
  }
  else {
    latitude = props.coords.latitude;
    longitude = props.coords.longitude;
  }
  localStorage.setItem(
    "arteInsiemeSalvataggio",
    props.saveableCanvas.getSaveData()
  );
  const firestore = firebase.firestore();
  const geoFirestore = new GeoFirestore(firestore);
  const geoCollectionRef = geoFirestore.collection('disegni');
  geoCollectionRef.doc(firebase.auth().currentUser.uid).set({
    disegno: props.saveableCanvas.getSaveData(),
    base64: props.saveableCanvas.canvasContainer.children[1].toDataURL(),
    coordinates: new firebase.firestore.GeoPoint(latitude, longitude),
    timestamp: + new Date(),
  });
  return <Typography color="textPrimary" style={{ "textTransform": "lowercase" }}>
    {testo}
    <Card style={{ backgroundColor: 'transparent' }} elevation={0}>
      <CardMedia
        style={{
          height: 100,
          backgroundColor: 'transparent',
        }}
        image={banner}
        title="Contemplative Reptile"
        component="img"
      />
    </Card>
  </Typography>
}

function VistaMappa() {
  const [photos, setPhotos] = useState([]);
  const db = firebase.firestore();
  let citiesRef = db.collection('disegno grande').orderBy("lat", 'desc');
  if (photos.length === 0) {
    citiesRef.get().then((value) => {
      setPhotos(value.docs.map((v) => ({
        src: "data:image/png;base64," + v.data().base64.ci
      })));
    })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
  return (
    <div style={{ overflow: 'auto', height: '100vh', display: 'block', position: "relative", marginBottom: "700px" }}>
      <Gallery photos={photos} />
    </div>
  )

}

function VistaDisegni(props) {
  const db = firebase.firestore();
  const geofirestore = new GeoFirestore(db);
  const [photos, setPhotos] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  var altezza = window.innerHeight;
  var larghezza = (isMobile) ? undefined : window.innerWidth;
  var query;
  if (props.isGeolocationAvailable && props.isGeolocationEnabled && props.coords != null) {
    query = geofirestore.collection('disegni').near({ center: new firebase.firestore.GeoPoint(props.coords.latitude, props.coords.longitude), radius: 1000 }).limit(30);
  }
  else {
    query = geofirestore.collection('disegni').near({ center: new firebase.firestore.GeoPoint(puntoSpeciale[0], puntoSpeciale[1]), radius: 1000 }).limit(30);
  }
  if (photos.length === 0) {
    query.get().then((value) => {
      setPhotos(value.docs.map((v) => ({
        src: v.data().base64,
        height: altezza,
        width: larghezza,
      })));
    });
  }
  if (photos.lenght < 1) {
    return <p>Ancora non ci sono immagini in questa zona, aggiungi tu la prima!</p>
  }
  return (
    <div style={{ overflow: 'auto', height: '100vh', display: 'block', position: "relative", marginBottom: "700px" }}>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  )
}

function DisegniOMappa(props) {
  if (!props.vistaMappa) {
    return <VistaDisegni
      isGeolocationAvailable={props.isGeolocationAvailable}
      isGeolocationEnabled={props.isGeolocationEnabled}
      coords={props.coords}
    />
  } else {
    return <VistaMappa />
  }
}

class Disegno extends React.Component {

  state = {
    color: "#444",
    datiDisegno: null,
    giaFatto: false,
    vistaMappa: false,
  };

  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex });
  };

  componentDidMount() {
    var localDisegno = localStorage.getItem("arteInsiemeSalvataggio");
    const db = firebase.firestore();
    let cityRef = db.collection("disegni").doc(firebase.auth().currentUser.uid);
    cityRef.get()
      .then(doc => {
        if (doc.exists) {
          let dis_ = doc.data().d.disegno;
          if (dis_ !== undefined) {
            this.setState({ datiDisegno: dis_ }).catch(err => { });
          }
        }
      })
      .catch(err => {
        if (localDisegno != null) {
          this.setState({
            datiDisegno: localDisegno,
          })
        }
      });
  }

  handleChange = () => {
    this.setState({ vistaMappa: !this.state.vistaMappa });
  };

  render() {
    if (this.props.vistaDisegni) {
      return (
        <div>
          <Fab
            color="secondary"
            aria-label="colore"
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
            <MapIcon style={{ color: "white" }} onClick={() => this.handleChange()} />
          </Fab>
          <DisegniOMappa
            isGeolocationAvailable={this.props.isGeolocationAvailable}
            isGeolocationEnabled={this.props.isGeolocationEnabled}
            coords={this.props.coords}
            vistaMappa={this.state.vistaMappa}
          />
        </div>)
    }
    return (
      <div>
        <Fab
          color="secondary"
          aria-label="colore"
          style={{
            margin: 0,
            zIndex: 1,
            top: 'auto',
            right: 20,
            bottom: 260,
            left: 'auto',
            position: 'fixed',
          }}
        >
          <Popup trigger={<ColorizeIcon style={{ color: "white" }} />} position="left center">
            <GithubPicker
              triangle={'hide'}
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
              disableAlpha={true}
            />
          </Popup>
        </Fab>
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
          <Popup trigger={
            <SaveIcon style={{ color: "white" }} />}
            position="left center">
            <LocationOk
              isGeolocationAvailable={this.props.isGeolocationAvailable}
              isGeolocationEnabled={this.props.isGeolocationEnabled}
              coords={this.props.coords}
              saveableCanvas={this.saveableCanvas}
            />
          </Popup>
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
          }}
            style={{ color: "white" }} />
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
          }} style={{ color: "white" }} />
        </Fab>

        <CanvasDraw
          hideInterface={(isMobile) ? true : false}
          ref={canvasDraw => {
            this.saveableCanvas = canvasDraw;
          }}
          lazyRadius={0}
          brushRadius={(isMobile) ? 3 : 7}
          saveData={this.state.datiDisegno}
          brushColor={this.state.color}
          style={{
            width: window.innerWidth,
            height: window.innerHeight - 65,
            zIndex: -1,
            position: "absolute",
          }}
        />
      </div>
    );
  }
}

function Footer() {
  return (
    <AppBar position="fixed" color="primary" className={useStyles().footer} elevation={0}>
      <Toolbar>
        <Button color="secondary" onClick={() => window.open("https://www.privacypolicygenerator.info/live.php?token=bOaq2FxZvBZ3mJY3PESMHOe27PREKKjp")}>Privacy policy</Button>
        <div className={useStyles().grow} />
        <Typography>
          Sponsorizzato da:
        </Typography>
        <Button color="secondary" onClick={() => window.open("https://www.morocolor.it/")}>Primo</Button>
      </Toolbar>
    </AppBar>
  )
}

class SignInScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleChange = () => {
    this.setState({ vistaDisegni: !this.state.vistaDisegni });
  };

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <div
            style={{
              backgroundColor: "#315190",
            }}>
            <Grid
              container
              spacing={5}
              direction="column"
              alignItems="center"
              justify="center"
              spacing={1}
              style={{ minHeight: '100vh', overflowY: "scroll" }}
            >
              <Grid item xs={12} >
                <Card style={{ maxWidth: 345, backgroundColor: 'transparent', marginBottom: "-50px" }} elevation={0}>
                  <CardMedia
                    style={{
                      height: 170,
                      backgroundColor: 'transparent',
                    }}
                    image={logo}
                    title="Contemplative Reptile"
                    component="img"
                  />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h1" component="h2">
                  Art@Hack
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="h5">
                  Una grande opera d'arte collettiva.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
              </Grid>
            </Grid>
          </div>
          <Footer />
        </div>
      );
    }
    return (
      <div>
        <BottomAppBar
          vistaDisegni={this.state.vistaDisegni}
          handleChange={this.handleChange}
        />
        <Disegno
          isGeolocationAvailable={this.props.isGeolocationAvailable}
          isGeolocationEnabled={this.props.isGeolocationEnabled}
          coords={this.props.coords}
          vistaDisegni={this.state.vistaDisegni}
        />
      </div>
    );
  }
}

function App(props) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SignInScreen
          isGeolocationAvailable={props.isGeolocationAvailable}
          isGeolocationEnabled={props.isGeolocationEnabled}
          coords={props.coords}
        />
      </ThemeProvider>
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  watchPosition: true,
  userDecisionTimeout: 5000,
})(App);
