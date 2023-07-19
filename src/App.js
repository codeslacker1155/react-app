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
        <header className="header">
          <h1>Book Search App</h1>
          <p>Created by: Christopher Hyatt</p>
          <p>A student at Kennesaw University Online</p>
        </header>
        <nav>
          <a href="http://ccse.kennesaw.edu/it">IT4403 ADVANCED WEB AND MOBILE APPLICATIONS - Summer 2023 Section W01</a>
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
          <p>© 2023 Christopher Hyatt</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
