import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Backend-la irunthu books-a fetch panrathuku
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // Pudhu book add panrathuku
  const addBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', { title, author });
      setTitle('');
      setAuthor('');
      fetchBooks(); // Refresh book list
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h2>📚 Book Library Management System</h2>
      
      {/* Add Book Form */}
      <form onSubmit={addBook} style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>Add New Book</h3>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Book Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            style={{ padding: '8px', width: '90%' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="text" 
            placeholder="Author Name" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            required 
            style={{ padding: '8px', width: '90%' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 15px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Book
        </button>
      </form>

      {/* Book List Display */}
      <h3>Available Books</h3>
      <ul style={{ paddingLeft: '20px' }}>
        {books.length === 0 ? (
          <p>No books available. Add a book above!</p>
        ) : (
          books.map((book) => (
            <li key={book._id} style={{ marginBottom: '8px' }}>
              <b>{book.title}</b> — <span style={{ color: '#555' }}>{book.author}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;