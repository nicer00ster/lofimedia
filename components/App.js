import React, { Component } from 'react';
import Player from './player/Player';
import Router from './router/Router';

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return (
        <Router />
    );
  };
};
