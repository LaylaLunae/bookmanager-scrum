import '../../pages/Home.css';
import { useState } from 'react';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { MOCK_BOOKS } from '../../mocks/MockBook';
import type { Book } from '../../types/Book';

export function MyBooksPanel() {
    const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all');

    const filteredBooks = MOCK_BOOKS;

    const renderMyBooksActions = (book: Book) => (
        <button
            className="filter-button active"
            onClick={() => alert(`Suppression de "${book.title}" de la bibliothèque`)}
        >
            Supprimer de ma bibliothèque
        </button>
    );

    return (
        <BookPanelLayout
            title="Mes Livres"
            books={filteredBooks}
            renderViewActions={renderMyBooksActions}
        >
            <div className="filter-bar">
                <button className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tous mes livres</button>
                <button className={`filter-button ${activeFilter === 'todo' ? 'active' : ''}`} onClick={() => setActiveFilter('todo')}>À lire</button>
                <button className={`filter-button ${activeFilter === 'doing' ? 'active' : ''}`} onClick={() => setActiveFilter('doing')}>En cours</button>
                <button className={`filter-button ${activeFilter === 'done' ? 'active' : ''}`} onClick={() => setActiveFilter('done')}>Lus</button>
            </div>
        </BookPanelLayout>
    );
}