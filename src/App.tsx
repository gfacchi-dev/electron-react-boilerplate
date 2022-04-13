import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.global.css';
import Homepage from './Screens/Homepage';
import Modello from './Screens/Modello';
import Stampa from './Screens/Stampa';
import Richiesta from './Screens/Richiesta';
import StampaRichiesta from './Screens/StampaRichiesta';
import Storico from './Screens/Storico';
import ModelloSemilavorati from './Screens/ModelloSemilavorati';
import StampaSemilavorati from './Screens/StampaSemilavorati';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/modello" component={Modello} />
        <Route path="/stampa" component={Stampa} />
        <Route path="/richiesta" component={Richiesta} />
        <Route path="/stamparichiesta" component={StampaRichiesta} />
        <Route path="/storico" component={Storico} />
        <Route path="/semilavorati" component={ModelloSemilavorati} />
        <Route path="/stampasemilavorati" component={StampaSemilavorati} />
      </Switch>
    </Router>
  );
}
