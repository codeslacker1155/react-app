import React, { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';
import ReactDOM from 'react-dom';
import BookDetailsPage from './BookDetailsPage';
import '../index.css';

function BookSearchPage() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('list');
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;
  const totalPages = 6; // Set the total number of pages

  const handleSearch = useCallback(() => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${resultsPerPage}`, (data) => {
      if (data.items && data.items.length > 0) {
        setBooks(data.items);
        const template = view === 'list' ? `
          {{#books}}
          <div class="list-view">
            <div id="book-details-{{id}}"></div>
          </div>
          {{/books}}
        ` : `
          {{#books}}
          <div class="grid-view">
            <div id="book-details-{{id}}"></div>
          </div>
          {{/books}}
        `;
        const rendered = Mustache.render(template, { books: data.items });
        $('#books').html(rendered);

        data.items.forEach(book => {
          const bookDetails = <BookDetailsPage id={book.id} />;
          ReactDOM.render(bookDetails, document.getElementById(`book-details-${book.id}`));
        });
      } else {
        setBooks([]);
      }
    });
  }, [search, currentPage, view]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search for books" 
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      <div className="view-buttons">
        <button onClick={() => setView('list')} className="search-button">List View</button>
        <button onClick={() => setView('grid')} className="search-button">Grid View</button>
      </div>
      <div id="books"></div>
      {books.length > 0 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} className="search-button">Previous Page</button>
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={`search-button ${currentPage === index + 1 ? 'active' : ''}`}>{index + 1}</button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} className="search-button">Next Page</button>
        </div>
      )}
    </div>
  );
}

export default BookSearchPage;
