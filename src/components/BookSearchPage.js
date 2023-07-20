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
  const [isSearched, setIsSearched] = useState(false); // Add state for search status
  const resultsPerPage = 10; // Set the number of results per page

  const handleSearch = useCallback(() => {
    setIsSearched(true); // Set isSearched to true when search button is clicked
    const startIndex = (currentPage - 1) * resultsPerPage; // Calculate the start index
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=${resultsPerPage}`, (data) => {
      if (data.items && data.items.length > 0) { // Check if the search results are not empty
        setBooks(data.items);
      } else {
        setBooks([]); // Clear the books if no results are returned
      }
    });
  }, [search, currentPage]);

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

  useEffect(() => {
    if (isSearched) { // Only call handleSearch and renderBooks if isSearched is true
      handleSearch();
      renderBooks();
    }
  }, [handleSearch, renderBooks, isSearched]);  // Remove books and currentPage from the dependencies

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <button onClick={() => setView('list')}>List View</button> {/* Button to switch to list view */}
      <button onClick={() => setView('grid')}>Grid View</button> {/* Button to switch to grid view */}
      <div id="books"></div>
      {isSearched && books.length > 0 && (
        <>
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous Page</button>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next Page</button>
        </>
      )}
    </div>
  );
}

export default BookSearchPage;
