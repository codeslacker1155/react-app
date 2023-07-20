import React, { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';
import ReactDOM from 'react-dom'; // Import ReactDOM
import BookDetailsPage from './BookDetailsPage'; // Import BookDetailsPage
import '../index.css';

function BookSearchPage() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('list'); // Add state for view

  const handleSearch = useCallback(() => {
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`, (data) => {
      setBooks(data.items);
    });
  }, [search]);

  const renderBooks = useCallback(() => {
    const template = view === 'list' ? `
      {{#books}}
      <div class="book">
        <div id="book-details-{{id}}"></div> <!-- Placeholder for BookDetailsPage -->
      </div>
      {{/books}}
    ` : `
      {{#books}}
      <div class="book-grid">
        <div id="book-details-{{id}}"></div> <!-- Placeholder for BookDetailsPage -->
      </div>
      {{/books}}
    `; // Adjust the template based on the view
    const rendered = Mustache.render(template, { books });
    $('#books').html(rendered);

    // Render BookDetailsPage for each book
    books.forEach(book => {
      const bookDetails = <BookDetailsPage id={book.id} />;
      ReactDOM.render(bookDetails, document.getElementById(`book-details-${book.id}`));
    });
  }, [books, view]); // Add view to the dependencies

  useEffect(() => {
    handleSearch();
    renderBooks();
  }, [books, handleSearch, renderBooks]);  

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search for books" 
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setView('list')}>List View</button> {/* Button to switch to list view */}
      <button onClick={() => setView('grid')}>Grid View</button> {/* Button to switch to grid view */}
      <div id="books"></div>
    </div>
  );
}

export default BookSearchPage;
