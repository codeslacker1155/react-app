import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [book, setBook] = useState({});
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes/Wfan6L9RGgYC')
      .then(response => response.json())
      .then(data => setBook(data));
  }, []);

  const handleSearch = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    const data = await response.json();
    setBooks(data.items);
  };

  return (
    <div className="App">
      <header className="header">
        <input 
          className="search-input"
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search for books" 
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </header>

      <main>
        <div className="book">
          <h2 className="book-title">{book.volumeInfo?.title}</h2>
          <img className="book-image" src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo?.title} />
          <p className="book-description">{book.volumeInfo?.description || 'No description available'}</p>
        </div>

        {books.map(book => (
          <div className="book" key={book.id}>
            <h2 className="book-title">{book.volumeInfo.title}</h2>
            <span><img className="book-image" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} /></span>
            <hr />
            <p className="book-description">{book.volumeInfo.description || 'No description available'}</p>
            <p className="book-authors"><strong>Authors: </strong>{book.volumeInfo.authors?.join(', ') || 'No authors available'}</p>
            <p className="book-categories"><strong>Categories: </strong>{book.volumeInfo.categories?.join(', ') || 'No categories available'}</p>
            <p className="book-identifiers"><strong>Identifiers: </strong>{book.volumeInfo.industryIdentifiers?.map(identifier => identifier.identifier).join(', ') || 'No identifiers available'}</p>
            <p className="book-published-date"><strong>Published Date: </strong>{book.volumeInfo.publishedDate}</p>
            <p className="book-publisher"><strong>Publisher: </strong>{book.volumeInfo.publisher}</p>
            <p className="book-page-count"><strong>Page Count: </strong>{book.volumeInfo.pageCount}</p>
            <p className="book-average-rating"><strong>Average Rating: </strong>{book.volumeInfo.averageRating}</p>
            <p className="book-ratings-count"><strong>Ratings Count: </strong>{book.volumeInfo.ratingsCount}</p>
            <p className="book-language"><strong>Language: </strong>{book.volumeInfo.language}</p>
            <p className="book-preview-link"><strong>Preview Link: </strong><a href={book.volumeInfo.previewLink}>{book.volumeInfo.previewLink}</a></p>
            <hr />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
