import React, { useState } from 'react';
import { Nav } from './components/NavBar';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { SingleView } from './pages/SingleView';
import { QueryParamProvider } from 'use-query-params';
import { SearchContextProvider } from './hooks/SearchContext';

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <SearchContextProvider>
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
        </SearchContextProvider>
      </QueryParamProvider>
    </Router>
  );
}
export default App;
