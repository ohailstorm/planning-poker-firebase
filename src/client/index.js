import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import App from '../components/App';
import 'firebase/database';

// TODO: pre-fetch poll data on server and server-side render
const firebaseConfig = {
  apiKey: 'AIzaSyAIzJ9SiRgzsmUliVNYNS35Iw2aCH-G2Fc',
  authDomain: 'planning-poker-4fe60.firebaseapp.com',
  databaseURL: 'https://planning-poker-4fe60.firebaseio.com',
  projectId: 'planning-poker-4fe60',
  storageBucket: '',
  messagingSenderId: '996825703490',
  appId: '1:996825703490:web:a87bec5953658956f139db'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
