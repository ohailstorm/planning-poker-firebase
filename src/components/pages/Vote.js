import React, { Component } from 'react';
import firebase from 'firebase/app';
import styled from 'styled-components';
import Button from '../Button';
import PollOptionsList from '../PollOptionsList';
import { Header1, Header2, primaryColor } from '../styled';

// Stolen with pride from https://gist.github.com/lvnam96/d341d3885244c285efc7590b7d9c107b

const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);
  const s = `${Math.floor(Math.random() * 100)}%`;
  const l = `${30 + Math.floor(Math.random() * 30)}%`; // max value of l is 100, but I set to 60 cause I want to generate dark colors
  // (use for background with white/light font color)
  return `hsl(${h},${s},${l})`;
};

const PollOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${props => (props.selected ? `border: 2px solid ${primaryColor};` : '')}
  margin-bottom: 8px;
`;

const StackedBar = styled.div`
  border-radius: 2px;
  color: white;
  background: ${() => getRandomColor()};
  height: ${props => 32 + props.height * 32}px;
  padding: 8px;
  margin: 8px;
`;

export default class PollPage extends Component {
  constructor() {
    super();
    this.state = {
      voted: false
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.setState({ voted: localStorage.getItem(match.params.id) });

    this.pollRef = firebase.database().ref(`/polls/${match.params.id}`);

    this.pollRef.on('value', val => this.setState({ poll: val.val() }));
  }

  //TODO: send vote to backend to validate data and add security rule to only allow write from backend
  vote(key) {
    const { match } = this.props;
    const pollId = match && match.params.id;
    this.pollRef.transaction(poll => {
      if (poll && poll.votes) {
        poll.votes[key] += 1;
        const oldVote = localStorage.getItem(pollId);
        if (oldVote && poll.votes[oldVote] > 0) {
          poll.votes[oldVote] -= 1;
        }
        localStorage.setItem(pollId, key);
        this.setState({ voted: key });
      }
      return poll;
    });
  }

  apiVote(key) {
    const { match } = this.props;
    const pollId = match && match.params.id;
    const oldVote = localStorage.getItem(pollId);
    this.setState({ isFetching: true });
    fetch(`/api/vote/${pollId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newVote: key, oldVote })
    })
      .then(() => {
        localStorage.setItem(pollId, key);
        this.setState({ voted: key, isFetching: false });
      })
      .catch(() => {
        this.setState({ isFetching: false });
      });
  }

  render() {
    const { poll, voted, isFetching } = this.state;

    if (!poll) return <Header1>LOADING...</Header1>;

    return (
      <div>
        <Header1>{poll.title}</Header1>
        {poll.votes && (
          <>
            <PollOptionsList>
              {Object.keys(poll.votes).map(key => (
                <PollOption>
                  {
                    <Button
                      onClick={() =>
                        !isFetching && voted !== key && this.vote(key)
                      }
                      selected={voted === key}
                      loading={isFetching}
                    >
                      {key}
                    </Button>
                  }
                </PollOption>
              ))}
            </PollOptionsList>
            <Header2>Results:</Header2>
            <PollOptionsList>
              {Object.keys(poll.votes).map(key => (
                <PollOption>
                  <div>{key}</div>
                  <StackedBar height={poll.votes[key]}>
                    Votes:
                    {poll.votes[key]}
                  </StackedBar>
                </PollOption>
              ))}
            </PollOptionsList>
          </>
        )}
      </div>
    );
  }
}
