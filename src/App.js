import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MyNavbar from './components/MyNavbar';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() { 
    return (
      <div className="App container">
        <MyNavbar/>
      </div>

    );
  }

}  