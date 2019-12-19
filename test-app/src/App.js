import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


const title = React.createElement(
  'h1',
  { id: 'main-title', title: 'This is a title.'},
  'Matcha !'
);
const desc = <p>I am learning React !</p>;
const header = React.createElement(
  'header',
  null,
  title,
  desc
);

//OTHER WAY:

const myTitleId = 'main-title';

const title2 = 'Matcha !';
const desc2 = 'I am learning React !';

const header2 = (
  <header>
    <h1 id={myTitleId}>{ title2 }</h1>
    <p>{ desc2 }</p>
  </header>
);


ReactDOM.render(
  header2,
  document.getElementById('header')
)

export default App;
