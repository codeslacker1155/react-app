import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookSearchPage from './components/BookSearchPage';
import BookDetailsPage from './components/BookDetailsPage';
import PublicBookshelfPage from './components/PublicBookshelpPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App">
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
          <p>© 2023 Christopher Hyatt</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
