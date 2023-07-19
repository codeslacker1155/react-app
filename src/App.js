import React, { useState, useEffect } from 'react';
import './App.css';

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
      <header>
        <h1>Google Books Search App</h1>
      </header>

      <main>
        <div>
          <h2>{book.volumeInfo?.title}</h2>
          <p>{book.volumeInfo?.description || 'No description available'}</p>
        </div>

        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search for books" 
        />
        <button onClick={handleSearch}>Search</button>

        {books.map(book => (
          <div key={book.id}>
            <h2>{book.volumeInfo.title}</h2>
            <p>{book.volumeInfo.description || 'No description available'}</p>
            <p>
              {book.volumeInfo.authors?.map(author => (
                <span key={author}>{author}</span>
              ))}

              {book.volumeInfo.authors?.length === 0 && <span>No authors available</span>}

              {book.volumeInfo.authors?.length > 0 && <span>Authors available</span>}
            </p>
            <p>
              {book.volumeInfo.categories?.map(category => (
                <span key={category}>{category}</span>
              ))}

              {book.volumeInfo.categories?.length === 0 && <span>No categories available</span>}
            </p>
            <p>
              {book.volumeInfo.industryIdentifiers?.map(identifier => (
                <span key={identifier.identifier}>{identifier.identifier}</span>
              ))}

              {book.volumeInfo.industryIdentifiers?.length === 0 && <span>No identifiers available</span>}
            </p>
            <p>{book.volumeInfo.publishedDate}</p>
            <p>{book.volumeInfo.publisher}</p>
            <p>{book.volumeInfo.pageCount}</p>
            <p>{book.volumeInfo.averageRating}</p>
            <p>{book.volumeInfo.ratingsCount}</p>
            <p>{book.volumeInfo.maturityRating}</p>
            <p>{book.volumeInfo.language}</p>
            <p>{book.volumeInfo.previewLink}</p>
            <p>{book.volumeInfo.infoLink}</p>
            <p>{book.volumeInfo.canonicalVolumeLink}</p>
            <p>{book.volumeInfo.subtitle}</p>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
            <a href={book.volumeInfo.previewLink} target="_blank" rel="noreferrer">Preview</a>
            <hr />
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
