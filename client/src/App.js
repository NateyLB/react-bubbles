import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from './components/PrivateRoute.js';
import BubblePage from './components/BubblePage.js';
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
        {/* route to login page */}
        <Route exact path="/" component={Login} />
        {/* Private route for authenticated user, renders a list 
        of colors and matching 'bubbles' for those colors
         */} 
        <PrivateRoute exact path="/protected" component={BubblePage}/> 
        
      </div>
    </Router>
  );
}

export default App;
