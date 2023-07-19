import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookSearchPage from '/components/BookSearchPage.js';
import BookDetailsPage from '/components/BookDetailsPage.js';
import PublicBookshelfPage from '/components/PublicBookshelfPage.js';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/search" component={BookSearchPage} />
          <Route path="/details/:id" component={BookDetailsPage} />
          <Route path="/bookshelf" component={PublicBookshelfPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
