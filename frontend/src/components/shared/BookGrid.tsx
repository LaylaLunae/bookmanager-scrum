import type { Book } from "../../types/Book";
import type { ReactNode } from "react";
import { BookCard } from "./BookCard";
import "./BookGrid.css";

interface BookGridProps {
    books: Book[];
    selectedBookId?: number;
    onBookClick: (book: Book) => void;
    renderCardExtra?: (book: Book) => ReactNode;
}

export function BookGrid({ books, selectedBookId, onBookClick, renderCardExtra }: BookGridProps) {
    return (
        <div className="books-grid">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    isSelected={selectedBookId === book.id}
                    onBookClick={onBookClick}
                    renderExtra={renderCardExtra ? renderCardExtra(book) : undefined}
                />
            ))}
        </div>
    );
}