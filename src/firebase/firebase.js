import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDgmcG2eGRPshC0jw40JTAcrMLJWf455Co",
    authDomain: "skolklass-fec97.firebaseapp.com",
    databaseURL: "https://skolklass-fec97.firebaseio.com",
    projectId: "skolklass-fec97",
    storageBucket: "",
    messagingSenderId: "917077829024"
  };

firebase.initializeApp(config);

export const database = firebase.database();
