import React, { useState, useEffect, useCallback } from 'react';
import $ from 'jquery';
import Mustache from 'mustache';
import '../index.css';

function BookDetailsPage({ id }) { // Receive id as a prop
  const [book, setBook] = useState({});

  const fetchBook = useCallback(() => {
    $.get(`https://www.googleapis.com/books/v1/volumes/${id}`, (data) => {
      setBook(data);
    });
  }, [id]);

  const renderBook = useCallback(() => {
    // Replace carriage return characters with line breaks
    const description = book.volumeInfo.description.replace(/_x000D_/g, '<br />');

    const template = `
      <div class="book">
        <h2 class="book-title">{{volumeInfo.title}}</h2>
        <img class="book-image" src="{{volumeInfo.imageLinks.thumbnail}}" alt="{{volumeInfo.title}}" />
        <div class="book-description">${description}</div>
        <p class="book-info"><strong>ISBN: </strong>{{volumeInfo.industryIdentifiers[0].identifier}}</p>
        <p class="book-info"><strong>Author(s): </strong>{{#volumeInfo.authors}}{{.}}{{/volumeInfo.authors}}</p>
        <p class="book-info"><strong>Publisher: </strong>{{volumeInfo.publisher}}</p>
        <p class="book-info"><strong>Page Count: </strong>{{volumeInfo.pageCount}}</p>
        <p class="book-info"><strong>Average Rating: </strong>{{volumeInfo.averageRating}} ({{volumeInfo.ratingsCount}} ratings)</p>
        <a href="{{volumeInfo.infoLink}}">More Info</a>
      </div>
    `;
    const rendered = Mustache.render(template, book);
    $('#book').html(rendered);
  }, [book]);

  useEffect(() => {
    fetchBook();
    renderBook();
  }, [id, fetchBook, renderBook]);

  return (
    <div id={`book-details-${id}`}></div> // Use the book id to create a unique id for each book details container
  );
}

export default BookDetailsPage;
