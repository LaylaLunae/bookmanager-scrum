import { useEffect, useState, useRef } from 'react';
import { BookPanelLayout, type BookPanelLayoutRef } from '../shared/BookPanelLayout';
import { BookForm } from '../admin/BookForm';
import { getAllBooks, deleteBook } from '../../services/bookService';
import type { Book } from '../../types/Book';
import './ManagementPanel.css';

export function ManagementPanel() {
    const [books, setBooks] = useState<Book[]>([]);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    const layoutRef = useRef<BookPanelLayoutRef>(null);

    const fetchBooks = () => {
        getAllBooks()
            .then((response) => setBooks(response.data))
            .catch((err) => console.error("Erreur API Admin :", err));
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = (book: Book) => {
        if (window.confirm(`Voulez-vous vraiment supprimer le livre "${book.title}" ?`)) {
            deleteBook(book.id)
                .then(() => {
                    setEditingBook(null);

                    layoutRef.current?.closeSidebar();

                    fetchBooks();
                })
                .catch((err) => console.error("Erreur suppression :", err));
        }
    };

    const renderManagementActions = (book: Book) => (
        <div className="management-actions-group">
            <button
                className="filter-button active edit-btn"
                onClick={() => setEditingBook(book)}
            >
                Modifier
            </button>
            <button
                className="filter-button active delete-btn"
                onClick={() => handleDelete(book)}
            >
                Supprimer
            </button>
        </div>
    );

    const getLayoutKey = () => {
        if (isAdding) return 'adding';
        if (editingBook) return `editing-${editingBook.id}`;
        return 'view';
    };

    return (
        <BookPanelLayout
            ref={layoutRef}
            key={getLayoutKey()}
            title="Gestion des livres"
            books={books}
            renderViewActions={renderManagementActions}
            adminSidebarContent={
                isAdding ? (
                    <BookForm
                        existingBooks={books}
                        onSuccess={() => { setIsAdding(false); fetchBooks(); }}
                        onCancel={() => setIsAdding(false)}
                    />
                ) : editingBook ? (
                    <BookForm
                        bookToEdit={editingBook}
                        existingBooks={books}
                        onSuccess={() => { setEditingBook(null); fetchBooks(); }}
                        onCancel={() => setEditingBook(null)}
                    />
                ) : undefined
            }
        >
            <div className="management-add-button-wrapper">
                <button
                    className="filter-button active"
                    onClick={() => {
                        setEditingBook(null);
                        setIsAdding(true);
                    }}
                >
                    Ajouter un livre
                </button>
            </div>
        </BookPanelLayout>
    );
}