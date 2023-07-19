import React, { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';
import '../index.css';

function PublicBookshelfPage() {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(() => {
    // Fetch the books from your public bookshelf
    // You need to replace the URL with the actual URL of your public bookshelf
    $.get('https://www.googleapis.com/books/v1/users/104553721219978298619/bookshelves/1', (data) => {
      setBooks(data.items);
    });
  }, []);

  const renderBooks = useCallback(() => {
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
  }, [books]);

  useEffect(() => {
    fetchBooks();
    renderBooks();
  }, [books, fetchBooks, renderBooks]);

  return (
    <div>
      <div id="books"></div>
    </div>
  );
}

export default PublicBookshelfPage;
