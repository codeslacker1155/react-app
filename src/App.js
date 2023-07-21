import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import BookDetailsPage from './components/BookDetailsPage';
import PublicBookshelfPage from './components/PublicBookshelpPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/public">My Bookshelf</Link>
        </nav>
        <Switch>
          <Route path="/book/:id">
            <BookDetailsPage />
          </Route>
          <Route path="/public">
            <PublicBookshelfPage />
          </Route>
          <Route path="/">
            <BookSearchPage />
          </Route>
        </Switch>
        <footer>
          <br />
          <p>© 2023 Christopher Hyatt</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
