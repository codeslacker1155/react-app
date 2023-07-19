import React, { useState } from 'react';

function BookSearchPage() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    const data = await response.json();
    setBooks(data.items);
  };

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search for books" 
      />
      <button onClick={handleSearch}>Search</button>
      {books.map(book => (
        <div className="book" key={book.id}>
          <h2 className="book-title">{book.volumeInfo.title}</h2>
          <img className="book-image" src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          <p className="book-description">{book.volumeInfo.description || 'No description available'}</p>
          <a href={book.volumeInfo.infoLink}>More Info</a>
        </div>
      ))}
    </div>
  );
}

export default BookSearchPage;
