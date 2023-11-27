import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import AllBooks from './components/all-books/AllBooks';
import BookService from './services/BookService';
import FormBook from "./components/form-book/FormBook";
import LogoSvg from './img/svg/logo.svg';


function App() {
    const bookService = new BookService();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        bookService.getAllBooks()
            .then((books) => {
                setBooks(books);
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });
    };

    const handleDeleteBook = async (id) => {
        try {
            await bookService.deleteBook(id);
            const updatedBooks = books.filter((book) => book.id !== id);
            setBooks(updatedBooks);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleAddBook = async (newBook) => {
        try {
            const addedBook = await bookService.addBook(newBook);
            setBooks([...books, addedBook]);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar sx={{ minHeight: 120, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>


                            <Link to="/" className="logo">
                                <img src={LogoSvg} alt="Logo" style={{ maxHeight: 80, width: 'auto', marginBottom: 16 ,marginTop:16}} />
                                {/* Kdo vytvořil logo? */}
                                {/* https://bucolic-liger-54950d.netlify.app/ */}
                            </Link>



                        <div style={{display:'flex',alignSelf: 'center'}}>
                            <Button
                                color="inherit"
                                component={Link}
                                to="/addbook"
                                sx={{
                                    fontSize: 18,
                                    marginLeft: 2,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    padding: '10px 20px',
                                    backgroundColor: '#2196f3',
                                    color: '#fff',
                                    borderRadius: '5px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#1565c0',
                                    },
                                }}
                            >
                                Add Book
                            </Button>

                            <Button
                                color="inherit"
                                component={Link}
                                to="/"
                                sx={{
                                    fontSize: 18,
                                    marginLeft: 2,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    padding: '10px 20px',
                                    backgroundColor: '#4caf50',
                                    color: '#fff',
                                    borderRadius: '5px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#388e3c',
                                    },
                                }}
                            >
                                All Books
                            </Button>

                        </div>
                    </Toolbar>
                </AppBar>


                <Routes>
                    <Route path="/" element={<AllBooks books={books} onDelete={handleDeleteBook} />} />
                    <Route path="/addbook" element={<FormBook onSubmit={handleAddBook} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
