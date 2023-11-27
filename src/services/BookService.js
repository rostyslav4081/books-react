class BookService {
    url = "http://localhost:8080/api/books";

    getAllBooks() {
        return fetch(this.url)
            .then(response => response.json())
            .then(data => data);
    }

    getBookByID(id) {
        return fetch(`${this.url}/${id}`)
            .then(response => response.json())
            .then(data => data);
    }

    addBook(bookData) {
        return fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
            .then(response => response.json())
            .then(data => data);
    }

    deleteBook(id) {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                // Перевірте, чи відповідь має статус 204 No Content перед викликом response.json()
                if (response.status === 204) {
                    return Promise.resolve(); // Повернути обіцянку без даних
                } else {
                    return response.json();
                }
            })
            .then(data => data);
    }
}

export default BookService;
