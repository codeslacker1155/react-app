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
          <p className="book-description">{book.volumeInfo.description || 'No description available'}</p>
          <p className="book-info"><strong>ISBN: </strong>{book.volumeInfo?.industryIdentifiers?.[0]?.identifier}</p>
          <p className="book-info"><strong>Author(s): </strong>{book.volumeInfo?.authors?.join(', ')}</p>
          <p className="book-info"><strong>Publisher: </strong>{book.volumeInfo?.publisher}</p>
          <p className="book-info"><strong>Page Count: </strong>{book.volumeInfo?.pageCount}</p>
          <p className="book-info"><strong>Average Rating: </strong>{book.volumeInfo?.averageRating} ({book.volumeInfo?.ratingsCount} ratings)</p>
          <a href={book.volumeInfo?.infoLink}>More Info</a>
        </div>

        {books.map(book => (
          <div className="book" key={book.id}>
            <h2 className="book-title">{book.volumeInfo.title}</h2>
            <img className="book-image" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <p className="book-description">{book.volumeInfo.description || 'No description available'}</p>
            <p className="book-info"><strong>ISBN: </strong>{book.volumeInfo.industryIdentifiers?.[0]?.identifier}</p>
            <p className="book-info"><strong>Author(s): </strong>{book.volumeInfo.authors?.join(', ')}</p>
            <p className="book-info"><strong>Publisher: </strong>{book.volumeInfo.publisher}</p>
            <p className="book-info"><strong>Page Count: </strong>{book.volumeInfo.pageCount}</p>
            <p className="book-info"><strong>Average Rating: </strong>{book.volumeInfo.averageRating} ({book.volumeInfo.ratingsCount} ratings)</p>
            <a href={book.volumeInfo.infoLink}>More Info</a>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
