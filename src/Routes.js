import React from 'react';
import { Switch } from 'react-router-dom';
import Home from './containers/Home';
import AppliedRoute from './components/AppliedRoute';
import Login from './containers/Login';
import CreatePodcast from './containers/CreatePodcast';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/home" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/" exact component={Login} appProps={appProps} />
      <AppliedRoute
        path="/podcasts/new"
        exact
        component={CreatePodcast}
        appProps={appProps}
      />
    </Switch>
  );
}
