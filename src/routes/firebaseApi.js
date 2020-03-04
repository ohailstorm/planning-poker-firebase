import express from 'express';

import * as firebase from 'firebase';
import 'firebase/database';

const router = express.Router();

const firebaseConfig = {
  apiKey: 'AIzaSyAIzJ9SiRgzsmUliVNYNS35Iw2aCH-G2Fc',
  authDomain: 'planning-poker-4fe60.firebaseapp.com',
  databaseURL: 'https://planning-poker-4fe60.firebaseio.com',
  projectId: 'planning-poker-4fe60',
  storageBucket: '',
  messagingSenderId: '996825703490',
  appId: '1:996825703490:web:a87bec5953658956f139db'
};

const app = firebase.initializeApp(firebaseConfig);

/**
 * TODO:
 * - set this up with firebase-admin to only allow writing data from server https://firebase.google.com/docs/admin/setup/#initialize_the_sdk
 * - add validation of data
 * */
router.post('/vote/:pollId', (req, res) => {
  const pollRef = app.database().ref(`/polls/${req.params.pollId}`);
  const { newVote, oldVote } = req.body;
  pollRef
    .transaction(poll => {
      if (poll && poll.votes) {
        poll.votes[newVote] += 1;
        if (oldVote && poll.votes[oldVote] > 0) {
          poll.votes[oldVote] -= 1;
        }
      }
      return poll;
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.status(501);
      res.json({ error: true });
    });
});

router.post('/create', (req, res) => {
  const pollId = Math.random()
    .toString(36)
    .substr(2, 8); // This id could in theory collide with existing poll, omitting it for now...
  const { title } = req.body;
  const poll = {
    title: title,
    votes: {
      '1': 0,
      '2': 0,
      '5': 0,
      '8': 0,
      '13': 0
    }
  };

  firebase
    .database()
    .ref(`polls/${pollId}`)
    .set(poll)
    .then(() => {
      res.json({ id: pollId });
    })
    .catch(() => {
      res.status(501);
      res.json({ error: true });
    });
});

export default router;
