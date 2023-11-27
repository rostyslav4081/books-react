import React from 'react';
import { Grid } from '@mui/material';
import Book from '../book/Book';

const AllBooks = ({ books, onDelete }) => {
    return (
        <Grid container spacing={4} justifyContent="center" marginTop="20px">
            {books.map((book) => (
                <Grid item key={book.id}>
                    <Book item={book} onDelete={onDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default AllBooks;
