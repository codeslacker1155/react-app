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
            <img className="book-image" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <p className="book-description">{book.volumeInfo.description || 'No description available'}</p>
            <p className="book-authors">Authors: {book.volumeInfo.authors?.join(', ') || 'No authors available'}</p>
            <p className="book-categories">Categories: {book.volumeInfo.categories?.join(', ') || 'No categories available'}</p>
            <p className="book-identifiers">Identifiers: {book.volumeInfo.industryIdentifiers?.map(identifier => identifier.identifier).join(', ') || 'No identifiers available'}</p>
            <p className="book-published-date">Published Date: {book.volumeInfo.publishedDate}</p>
            <p className="book-publisher">Publisher: {book.volumeInfo.publisher}</p>
            <p className="book-page-count">Page Count: {book.volumeInfo.pageCount}</p>
            <p className="book-average-rating">Average Rating: {book.volumeInfo.averageRating}</p>
            <p className="book-ratings-count">Ratings Count: {book.volumeInfo.ratingsCount}</p>
            <p className="book-language">Language: {book.volumeInfo.language}</p>
            <p className="book-preview-link">Preview Link: <a href={book.volumeInfo.previewLink}>{book.volumeInfo.previewLink}</a></p>
            <p className="book-info-link">Info Link: <a href={book.volumeInfo.infoLink}>{book.volumeInfo.infoLink}</a></p>
            <p className="book-canonical-volume-link">Canonical Volume Link: <a href={book.volumeInfo.canonicalVolumeLink}>{book.volumeInfo.canonicalVolumeLink}</a></p>
            <p className="book-subtitle">Subtitle: {book.volumeInfo.subtitle}</p>
            <hr />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
