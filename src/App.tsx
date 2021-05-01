import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.global.css';
import Homepage from './Screens/Homepage';
import Modello from './Screens/Modello';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/modello" component={Modello} />
      </Switch>
    </Router>
  );
}
