import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Timeline from 'src/components/Timeline';
import Error from 'src/components/Error';
import Discover from 'src/containers/Discover';
import CreateEvent from 'src/components/CreateEvent';
import Login from 'src/components/Login';

export default function Explorastro() {
  return (
    <div className="explorastro">
      <Switch>
        <Route exact path="/">
          <Header />
          <Redirect to="/timeline" />
          <Footer />
        </Route>
        <Route exact path="/timeline">
          <Header />
          <Timeline />
          <Footer />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/exploration/create">
          <Header />
          <CreateEvent />
          <Footer />
        </Route>
        <Route exact path="/discover">
          <Header />
          <Discover />
          <Footer />
        </Route>
        <Route>
          <Header />
          <Error />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}
