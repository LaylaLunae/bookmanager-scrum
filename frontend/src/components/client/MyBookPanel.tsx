import '../../pages/Home.css';
import { useState, useEffect } from 'react';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { getMyLibrary } from '../../services/libraryService';
import type { Book } from '../../types/Book';

export function MyBooksPanel() {
    const [books, setBooks] = useState<Book[]>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getMyLibrary()
            .then((response) => {
                const extractedBooks = response.data.map(item => item.book);
                setBooks(extractedBooks);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur chargement bibliothèque perso :", err);
                setLoading(false);
            });
    }, []);

    const renderMyBooksActions = (book: Book) => (
        <button className="filter-button active">
            Action sur {book.title}
        </button>
    );

    if (loading) {
        return (
            <div className="catalogue-layout">
                <div className="catalogue-main">
                    <h2>Mes Livres</h2>
                    <p>Chargement de votre bibliothèque...</p>
                </div>
            </div>
        );
    }

    return (
        <BookPanelLayout
            title="Mes Livres"
            books={books}
            renderViewActions={renderMyBooksActions}
        >
            <div className="filter-bar">
                <button className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tous mes livres</button>
                <button className={`filter-button ${activeFilter === 'todo' ? 'active' : ''}`} onClick={() => setActiveFilter('todo')}>À lire</button>
                <button className={`filter-button ${activeFilter === 'doing' ? 'active' : ''}`} onClick={() => setActiveFilter('doing')}>En cours</button>
                <button className={`filter-button ${activeFilter === 'done' ? 'active' : ''}`} onClick={() => setActiveFilter('done')}>Lus</button>
            </div>
            {books.length === 0 && (
                <div className="no-books-message">
                    <p>Vous n'avez pas de livres pour le moment. Ajoutez-en depuis le catalogue.</p>
                </div>
            )}
        </BookPanelLayout>
    );
}