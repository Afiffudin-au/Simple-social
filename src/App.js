import React from 'react';
import './App.css';
import WritePost from './WritePost/WritePost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AuthenticationForm from './AuthenticationForm/AuthenticationForm';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/writePost"><WritePost/></Route>
          <Route path="/authentication"><AuthenticationForm/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
