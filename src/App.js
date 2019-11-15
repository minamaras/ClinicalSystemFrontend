import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import MyNavbar from './components/MyNavbar';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      role: "",
      isLoggedIn: false
    }

  }

  render() { 

    let role = this.state.role;
    let isLoggedIn = this.state.isLoggedIn;
    //this.setState((state) => ({ role: "patient", isLoggedIn: true}));
    return (
      <div className="App container">
        <MyNavbar 
          role = {role}
          isLoggedIn = {isLoggedIn}
        />
      </div>

    );
  }

}  