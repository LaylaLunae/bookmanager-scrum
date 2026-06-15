import type { ReactNode } from "react";
import type { Book } from "../../types/Book";
import "./BookCard.css";

interface BookCardProps {
    book: Book;
    isSelected: boolean;
    onBookClick: (book: Book) => void;
    renderExtra?: ReactNode;
}

export function BookCard({ book, isSelected, onBookClick, renderExtra }: BookCardProps) {
    return (
        <div
            className={`book-item-card ${isSelected ? 'selected' : ''}`}
            onClick={() => onBookClick(book)}
        >
            <div className="book-view-cover">
                <img src={book.cover} alt={book.title} />
            </div>
            <div className="book-view-info">
                <h2>{book.title}</h2>

                {renderExtra && (
                    <div className="book-card-extra">
                        {renderExtra}
                    </div>
                )}
            </div>
        </div>
    );
}