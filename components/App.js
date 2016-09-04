import React, {Component} from 'react';
import {render} from 'react-dom';
import ToDo from './ToDo';

export default class App extends Component {
  render() {
    return (
      <div id='App'>
        <ToDo />
      </div>
    )
  }
}

render(<App />, document.getElementById('main-container'));
