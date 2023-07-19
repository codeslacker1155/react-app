import React, { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';
import ReactDOM from 'react-dom'; // Import ReactDOM
import BookDetailsPage from './BookDetailsPage'; // Import BookDetailsPage
import '../index.css';

function BookSearchPage() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = useCallback(() => {
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`, (data) => {
      setBooks(data.items);
    });
  }, [search]);

  const renderBooks = useCallback(() => {
    const template = `
      {{#books}}
      <div class="book">
        <h2 class="book-title">{{volumeInfo.title}}</h2>
        <img class="book-image" src="{{volumeInfo.imageLinks.thumbnail}}" alt="{{volumeInfo.title}}" />
        <p class="book-description">{{volumeInfo.description}}</p>
        <div id="book-details-{{id}}"></div> <!-- Placeholder for BookDetailsPage -->
        <a href="{{volumeInfo.infoLink}}">More Info</a>
      </div>
      {{/books}}
    `;
    const rendered = Mustache.render(template, { books });
    $('#books').html(rendered);

    // Render BookDetailsPage for each book
    books.forEach(book => {
      const bookDetails = <BookDetailsPage id={book.id} />;
      ReactDOM.render(bookDetails, document.getElementById(`book-details-${book.id}`));
    });
  }, [books]);

  useEffect(() => {
    renderBooks();
  }, [books, renderBooks]);  

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search for books" 
      />
      <button onClick={handleSearch}>Search</button>
      <div id="books"></div>
    </div>
  );
}

export default BookSearchPage;
