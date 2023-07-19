// PublicBookshelfPage.js
import React, { useState, useEffect } from 'react';

function PublicBookshelfPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the books from your public bookshelf
    // You need to replace the URL with the actual URL of your public bookshelf
    fetch('https://www.googleapis.com/books/v1/users/userId/bookshelves/shelfId/volumes')
      .then(response => response.json())
      .then(data => setBooks(data.items));
  }, []);

  return (
    <div>
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

export default PublicBookshelfPage;
