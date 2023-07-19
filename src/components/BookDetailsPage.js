import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(response => response.json())
      .then(data => setBook(data));
  }, [id]);

  return (
    <div className="book">
      <h2 className="book-title">{book.volumeInfo?.title}</h2>
      <img className="book-image" src={book.volumeInfo?.imageLinks?.thumbnail} alt={book.volumeInfo?.title} />
      <div className="book-description" dangerouslySetInnerHTML={{ __html: book.volumeInfo?.description || 'No description available' }}></div>
      <p className="book-info"><strong>ISBN: </strong>{book.volumeInfo?.industryIdentifiers?.[0]?.identifier}</p>
      <p className="book-info"><strong>Author(s): </strong>{book.volumeInfo?.authors?.join(', ')}</p>
      <p className="book-info"><strong>Publisher: </strong>{book.volumeInfo?.publisher}</p>
      <p className="book-info"><strong>Page Count: </strong>{book.volumeInfo?.pageCount}</p>
      <p className="book-info"><strong>Average Rating: </strong>{book.volumeInfo?.averageRating} ({book.volumeInfo?.ratingsCount} ratings)</p>
      <a href={book.volumeInfo?.infoLink}>More Info</a>
    </div>
  );
}

export default BookDetailsPage;
