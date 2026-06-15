import { useEffect, useState } from 'react';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { AddBookForm } from '../admin/AddBookForm';
import { getAllBooks } from '../../services/bookService';
import type { Book } from '../../types/Book';

export function ManagementPanel() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);

    const fetchBooks = () => {
        getAllBooks()
            .then((response) => setBooks(response.data))
            .catch((err) => console.error("Erreur API Admin :", err));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const renderManagementActions = (book: Book) => (
        <div className="management-actions-group">
            <button className="filter-button active edit-btn" onClick={() => alert(`Modifier : ${book.title}`)}>
                Modifier
            </button>
            <button className="filter-button active delete-btn" onClick={() => alert(`Supprimer : ${book.title}`)}>
                Supprimer
            </button>
        </div>
    );

    return (
        <BookPanelLayout
            key={isAdding ? 'adding-mode' : 'view-mode'}
            title="Gestion des livres"
            books={books}
            renderViewActions={renderManagementActions}
            adminSidebarContent={
                isAdding ? (
                    <AddBookForm
                        onBookAdded={() => { setIsAdding(false); fetchBooks(); }}
                        onCancel={() => setIsAdding(false)}
                    />
                ) : undefined
            }
        >
            <div style={{ margin: '1.5rem 0' }}>
                <button className="filter-button active" onClick={() => setIsAdding(true)}>
                    Ajouter un livre
                </button>
            </div>
        </BookPanelLayout>
    );
}