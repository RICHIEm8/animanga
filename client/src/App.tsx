import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { Nav } from './components/NavBar';

import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { Anime } from './pages/Anime';
import { TopAnime } from './pages/TopAnime';
import { TopCharacters } from './pages/TopCharacters';
import { TopManga } from './pages/TopManga';
import { TopPeople } from './pages/TopPeople';

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
          <Route path="/top-manga" exact>
            <TopManga />
          </Route>
          <Route path="/top-characters" exact>
            <TopCharacters />
          </Route>
          <Route path="/top-people" exact>
            <TopPeople />
          </Route>
          <Route path="/results" exact>
            <Results />
          </Route>
          <Route path="/anime/:id" exact>
            <Anime />
          </Route>
          <Redirect to="/" />
        </Switch>
      </QueryParamProvider>
    </Router>
  );
}
export default App;
