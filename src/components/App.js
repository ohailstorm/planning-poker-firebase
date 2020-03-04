import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

// import './app.css';
import Vote from "./pages/Vote";
import Start from "./pages/Start";
import CreatePoll from "./pages/CreatePoll";
import Button from "./Button";
import { NavBar } from "./styled";

const GlobalStyle = createGlobalStyle`
  body {
    color: #0f0f0f;
    text-align: center;
    margin: auto;
    padding: 24px;
    font-family: monospace;
  }
  
  button, input {
    font-family: monospace;    
  }  
`;

export default class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <GlobalStyle />
        <NavBar>
          <Link to="/">
            <Button>Start</Button>
          </Link>
          <Link to="/create-poll">
            <Button>Create Poll</Button>
          </Link>
        </NavBar>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route path="/poll/:id" component={Vote} />
          <Route path="/create-poll/" component={CreatePoll} />
        </Switch>
      </div>
    );
  }
}
