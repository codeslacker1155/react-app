import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import BookDetailsPage from './components/BookDetailsPage';
import PublicBookshelfPage from './components/PublicBookshelfPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/details/:id">
            <BookDetailsPage />
          </Route>
          <Route path="/bookshelf">
            <PublicBookshelfPage />
          </Route>
          <Route path="/">
            <BookSearchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
