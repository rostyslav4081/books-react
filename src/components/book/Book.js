import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const Book = ({ item, onDelete }) => {
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirmed = () => {
        setDeleteDialogOpen(false);
        if (onDelete) {
            onDelete(item.id);
        }
    };

    const handleDeleteCancelled = () => {
        setDeleteDialogOpen(false);
    };

    return (
        <Card sx={{ width: '18rem', height: '100%', margin: '10px', display: 'flex', flexDirection: 'column' }}>
            <CardMedia component="img" alt={item.imgAlt} height="200" image={item.imgSrc} style={{ objectFit: 'cover' }} />
            <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', marginBottom: '4px', color: '#666' }}>
                    Author: {item.infoAuthor}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '4px', color: '#444' }}>
                    Category: {item.infoCategory}
                </Typography>
            </CardContent>
            <div style={{ height: '80px', display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                <Button
                    variant="contained"
                    color="error"
                    style={{ height: '40px', width: '120px' }}
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
            </div>


            <Dialog open={isDeleteDialogOpen} onClose={handleDeleteCancelled}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this book?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancelled}>Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default Book;
