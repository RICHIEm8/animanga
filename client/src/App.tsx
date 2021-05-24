import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { topAnimeResultsData, TopAnimeResult } from './api/api';
import { Nav } from './components/NavBar';

import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { SingleView } from './pages/SingleView';
import { TopAnime } from './pages/TopAnime';

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/top-anime" exact>
            <TopAnime />
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
