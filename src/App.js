import React, { useState } from 'react';
import './index.css';

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

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
            <p>{book.volumeInfo.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
