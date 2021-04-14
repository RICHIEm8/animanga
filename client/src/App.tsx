import React, { useState } from 'react';
import { Nav } from './components/Nav';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { SingleView } from './pages/SingleView';
import { QueryParamProvider } from 'use-query-params';

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/results" exact>
            <Results />
          </Route>
          <Route path="/single-view" exact>
            <SingleView />
          </Route>
          <Redirect to="/" />
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
export default App;
