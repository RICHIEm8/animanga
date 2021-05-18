import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Nav } from './components/NavBar';

import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { SingleView } from './pages/SingleView';
import { TopAnime } from './pages/TopAnime';
import { topAnimeResults } from './api/api';

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
          {/* <Route path="/top-anime" exact>
              <TopAnime topAnimeResults={topAnimeResults} />
            </Route> */}
          <Redirect to="/" />
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
export default App;
