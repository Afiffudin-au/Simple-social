import React from 'react';
import './App.css';
import WritePost from './WritePost/WritePost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AuthenticationForm from './AuthenticationForm/AuthenticationForm';
import Home from './Home/Home';
import ProfileUser from './Profileuser/ProfileUser';
function App() {
  return (
    <div className="App">
      <Router>   
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/writePost"><WritePost/></Route>
          <Route path="/authentication"><AuthenticationForm/></Route>
          <Route path="/profileUser"><ProfileUser/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
