import type { ReactNode } from "react";
import type { Book } from "../types/Book";
import "./BookView.css";

interface BookViewProps {
    book: Book;
    onClose: () => void;
    actions?: ReactNode;
}

export function BookView({ book, onClose, actions }: BookViewProps) {
    return (
        <div className="book-view-container">
            <div className="book-view-header">
                <button onClick={onClose} className="filter-button">
                    ✕ Fermer
                </button>

                {actions && (
                    <div className="book-view-header-actions">
                        {actions}
                    </div>
                )}
            </div>

            <div className="book-view-content">
                <div className="book-view-cover">
                    <img src={book.cover} alt={book.title} />
                </div>

                <div className="book-view-info">
                    <span className="book-genre-badge">{book.genre}</span>
                    <h2>{book.title}</h2>
                    <p className="book-author">Par {book.author}</p>

                    <h3>Résumé</h3>
                    <p className="book-summary">{book.summary}</p>
                </div>
            </div>
        </div>
    );
}