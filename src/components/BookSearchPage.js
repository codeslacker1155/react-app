import React, { useState } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';

function BookSearchPage() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [view, setView] = useState('list'); // Add this state to switch between list and grid views

  const handleSearch = () => {
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`, (data) => {
      setBooks(data.items);
    });
  };

  const renderBooks = () => {
    const template = $('#bookTemplate').html();
    const rendered = Mustache.render(template, { books });
    $('#books').html(rendered);
  };

  useEffect(() => {
    renderBooks();
  }, [books]);

  return (
    <div>
      <input 
        type="text" 
        value={search} 
        onChange={e => setSearch(e.target.value)} 
        placeholder="Search for books" 
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => setView('list')}>List View</button>
      <button onClick={() => setView('grid')}>Grid View</button>
      <div id="books" className={view}></div>
      <script id="bookTemplate" type="text/template">
        {{#books}}
        <div class="book">
          <h2 class="book-title">{{volumeInfo.title}}</h2>
          <img class="book-image" src="{{volumeInfo.imageLinks.thumbnail}}" alt="{{volumeInfo.title}}" />
          <p class="book-description">{{volumeInfo.description}}</p>
          <a href="{{volumeInfo.infoLink}}">More Info</a>
        </div>
        {{/books}}
      </script>
    </div>
  );
}

export default BookSearchPage;
