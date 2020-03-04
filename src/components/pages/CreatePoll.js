import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { Input, Header1 } from '../styled';
import Button from '../Button';

export default class CreatePoll extends Component {
  constructor() {
    super();
    this.state = {
      pollTitle: ''
    };
  }

  //TODO: put this server side
  createPoll() {
    const pollId = Math.random()
      .toString(36)
      .substr(2, 8); // This id could in theory collide with existing poll, omitting it for now...
    const { pollTitle } = this.state;
    const poll = {
      title: pollTitle,
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
      .set(poll, error => {
        if (error) {
          this.setState({ error: true });
        } else {
          this.setState({ success: true, pollId });
        }
      });
  }

  serverCreatePoll() {
    const { pollTitle } = this.state;
    this.setState({ isFetching: true });
    fetch(`/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: pollTitle })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ success: true, pollId: data.id, isFetching: false });
      })
      .catch(() => {
        this.setState({ error: true, isFetching: false });
      });
  }

  render() {
    const { success, pollId, isFetching } = this.state;
    return (
      <div>
        <Header1>Create Poll!</Header1>
        {success ? (
          <div>
            Success! To access your poll enter <em>{pollId}</em> on start page
            or go to <Link to={`/poll/${pollId}`}>this link</Link>
          </div>
        ) : (
          <>
            <Input
              onChange={evt => {
                this.setState({ pollTitle: evt.target.value });
              }}
              type="text"
              id="vote-id"
              placeholder="As a..."
            />
            <Button onClick={() => !isFetching && this.serverCreatePoll()}>
              CREATE
            </Button>
          </>
        )}
      </div>
    );
  }
}
