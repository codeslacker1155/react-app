import React, { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';
import '../index.css';
import ReactDOM from 'react-dom'; // Import ReactDOM
import BookDetailsPage from './BookDetailsPage'; // Import the BookDetailsPage component

function PublicBookshelfPage() {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(() => {
    // Fetch the books from your public bookshelf
    // You need to replace the URL with the actual URL of your public bookshelf
    $.get('https://www.googleapis.com/books/v1/users/104553721219978298619/bookshelves/1001/volumes', (data) => {
      setBooks(data.items);
    });
  }, []);

  const renderBooks = useCallback(() => {
    const template = `
      {{#books}}
      <div class="book">
        <div id="book-details-{{id}}"></div> <!-- Placeholder for the BookDetailsPage component -->
        <div class="book-number">{{@index}}</div>
      </div>
      {{/books}}
    `;
    const rendered = Mustache.render(template, { books });
    $('#books').html(rendered);

    // Render the BookDetailsPage component for each book
    books.forEach(book => {
      const { id } = book;
      const bookDetailsContainer = document.getElementById(`book-details-${id}`);
      if (bookDetailsContainer) {
        ReactDOM.render(<BookDetailsPage id={id} />, bookDetailsContainer);
      }
    });
  }, [books]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]); // Fetch the books when the component mounts

  useEffect(() => {
    if (books.length > 0) { // Only render the books and the BookDetailsPage component if the book data has been fetched
      renderBooks();
    }
  }, [books, renderBooks]); // Re-render whenever a new book is added

  return (
    <div>
      <div id="books"></div>
    </div>
  );
}

export default PublicBookshelfPage;
