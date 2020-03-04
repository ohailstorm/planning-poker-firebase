import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Header1, Header2 } from '../styled';
import Button from '../Button';

export default class Start extends Component {
  constructor() {
    super();
    this.state = {
      voteId: ''
    };
  }

  render() {
    const { voteId } = this.state;
    return (
      <div>
        <Header1>HEJ! Enter ID to existing poll:</Header1>
        <Input
          onChange={evt => {
            this.setState({ voteId: evt.target.value });
          }}
          type="text"
          id="vote-id"
          placeholder="Enter ID to existing poll:"
        />
        {voteId && voteId.length === 8 && (
          <Link to={`/poll/${voteId}`}>
            <Button>Vote</Button>
          </Link>
        )}
        <div>
          <Header2>Or create a new one:</Header2>
          <Link to="/create-poll">
            <Button>Create Poll</Button>
          </Link>
        </div>
      </div>
    );
  }
}
