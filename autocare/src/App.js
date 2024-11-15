import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import UserCard from './UserCard';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import OurTeam from './OurTeam';
function App() {

    return(
    
      <Router>
        <Routes>
          <Route path ="/home" element= {<HomePage></HomePage>}></Route>
          <Route path ="/about" element = {<AboutUs></AboutUs>}></Route>
        </Routes> 
      </Router>
    
    )
  


}

export default App;
