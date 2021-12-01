import React, { useState, useEffect } from "react";
import './App.css';
import Auth from './Components/Auth/Auth'
import Logout from "./Components/Logout/Logout";
import Header from "./Components/Site/Navbar"
import Home from "./Components/Site/Home"
import {
  BrowserRouter as Router
} from 'react-router-dom';


function App() {
  const [sessionToken, setSessionToken] = useState(undefined);

  useEffect(() => {
    if(localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'))
    }
  }, []);

  const updateLocalStorage = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearLocalStorage = () =>{
    localStorage.clear(Logout);
    setSessionToken(undefined);
  };


  const viewConductor = () => {
    return sessionToken !== undefined ? <Home token={sessionToken} /> : <Auth updateLocalStorage={updateLocalStorage} /> ;
  };

  return (
    <div className="App">
      <Router>
      <Header clearLocalStorage={clearLocalStorage}/>
      {viewConductor()}
      </Router>
    </div>
  );
}

export default App;

