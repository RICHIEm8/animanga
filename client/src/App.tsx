import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Nav } from './components/NavBar';
import { SearchContextProvider } from './hooks/SearchContext';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { SingleView } from './pages/SingleView';

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
