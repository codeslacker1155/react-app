import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';

function BookSearchPage() {
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    $.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`, (data) => {
      setBooks(data.items);
    });
  };

  const renderBooks = () => {
    const template = `
      {{#books}}
      <div class="book">
        <h2 class="book-title">{{volumeInfo.title}}</h2>
        <img class="book-image" src="{{volumeInfo.imageLinks.thumbnail}}" alt="{{volumeInfo.title}}" />
        <p class="book-description">{{volumeInfo.description}}</p>
        <a href="{{volumeInfo.infoLink}}">More Info</a>
      </div>
      {{/books}}
    `;
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
      <div id="books"></div>
    </div>
  );
}

export default BookSearchPage;
