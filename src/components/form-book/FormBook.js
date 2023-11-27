import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography } from '@mui/material';

const validationMessages = {
    name: 'Only letters are allowed.',
    infoIndexId: 'Only numbers are allowed.',
    infoAuthor: 'Only letters and spaces are allowed.',
    infoCategoryId: 'Only numbers are allowed.',
    infoCategory: 'Only letters and spaces are allowed.',
    imgSrc: 'Valid URL is required.',
    imgAlt: 'Only letters, numbers, and spaces are allowed.',
};

const BookForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        infoIndexId: '',
        infoAuthor: '',
        infoCategoryId: '',
        infoCategory: '',
        imgSrc: '',
        imgAlt: '',
    });

    const [modalOpen, setModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Валідація для кожного поля
        switch (name) {
            case 'name':
                setFormData((prevData) => ({ ...prevData, [name]: value.replace(/[^a-zA-Z]/g, '') }));
                break;
            case 'infoIndexId':
                setFormData((prevData) => ({ ...prevData, [name]: value.replace(/\D/g, '') }));
                break;
            case 'infoAuthor':
                setFormData((prevData) => ({ ...prevData, [name]: value.replace(/[^a-zA-Z\s]/g, '') }));
                break;
            case 'infoCategoryId':
                setFormData((prevData) => ({ ...prevData, [name]: value.replace(/\D/g, '') }));
                break;
            case 'infoCategory':
                setFormData((prevData) => ({ ...prevData, [name]: value.replace(/[^a-zA-Z\s]/g, '') }));
                break;
            case 'imgSrc':
                setFormData((prevData) => ({ ...prevData, [name]: value }));
                break;
            case 'imgAlt':
                setFormData((prevData) => ({ ...prevData, [name]: value.replace(/[^a-zA-Z0-9\s]/g, '') }));
                break;
            default:
                setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className="container mt-4" style={{ width: '30%', margin: '20px auto', textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((name) => (
                    <div key={name} className="mb-3" style={{ textAlign: 'left' }}>
                        <TextField
                            label={name.charAt(0).toUpperCase() + name.slice(1)}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                        />
                        <Typography variant="caption" color="textSecondary" style={{ fontStyle: 'italic' }}>
                            {validationMessages[name]}
                        </Typography>
                    </div>
                ))}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ width: '50%', margin: '20px auto', padding: '15px 30px', fontSize: '16px' }}
                >
                    Submit
                </Button>
            </form>

            <Dialog open={modalOpen} onClose={handleModalClose}>
                <DialogTitle>Form Submitted</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">The form has been successfully submitted!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleModalClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BookForm;
