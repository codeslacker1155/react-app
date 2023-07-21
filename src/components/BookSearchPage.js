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
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const [loading, setLoading] = useState(false); // Add state for loading status
  const resultsPerPage = 10; // Set the number of results per page

  const renderBooks = useCallback(() => {
    if (books.length > 0) { // Only render books if there are books to render
      const template = view === 'list' ? `
        {{#books}}
        <div class="list-view">
          <div id="book-details-{{id}}"></div> <!-- Placeholder for BookDetailsPage -->
        </div>
        {{/books}}
      ` : `
        {{#books}}
        <div class="grid-view">
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
    }
  }, [books, view]); // Add view to the dependencies

  const handleSearch = useCallback(() => {
    setLoading(true); // Set loading to true when search starts
    const startIndex = (currentPage - 1) * resultsPerPage; // Calculate the start index
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${resultsPerPage}`, (data) => {
      if (data.items && data.items.length > 0) { // Check if the search results are not empty
        setBooks(data.items);
        renderBooks(); // Call renderBooks after setting books
      } else {
        setBooks([]); // Clear the books if no results are returned
      }
      setLoading(false); // Set loading to false when search finishes
    });
  }, [search, currentPage, renderBooks]); // Add renderBooks to the dependencies

  useEffect(() => {
    if (!loading) {
      handleSearch();
    }
  }, [loading, handleSearch]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || (pageNumber > 1 && books.length === 0)) {
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
        className="search-input" // Add class name for styling
      />
      <button onClick={handleSearch} className="search-button">Search</button> {/* Add class name for styling */}
      <div className="view-buttons">
        <button onClick={() => setView('list')} className="search-button">List View</button> {/* Button to switch to list view */}
        <button onClick={() => setView('grid')} className="search-button">Grid View</button> {/* Button to switch to grid view */}
      </div>
      <div id="books"></div>
      {books.length > 0 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} className="search-button">Previous Page</button>
          <button onClick={() => handlePageChange(currentPage + 1)} className="search-button">Next Page</button>
        </div>
      )}
    </div>
  );
}

export default BookSearchPage;
