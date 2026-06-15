import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Book } from "../../types/Book";
import { BookGrid } from "./BookGrid";
import { BookView } from "../../views/BookView";
import "./BookPanelLayout.css";

interface BookPanelLayoutProps {
    title: string;
    description?: string;
    books: Book[];
    renderCardExtra?: (book: Book) => ReactNode;
    renderViewActions?: (book: Book) => ReactNode;
    children?: ReactNode;
    adminSidebarContent?: ReactNode;
}

export function BookPanelLayout({
    title,
    description,
    books,
    renderCardExtra,
    renderViewActions,
    children,
    adminSidebarContent
}: BookPanelLayoutProps) {

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    useEffect(() => {
        if (adminSidebarContent) {
            setSelectedBook(null);
        }
    }, [adminSidebarContent]);

    return (
        <div className="catalogue-layout">

            <div className="catalogue-main">
                <h2>{title}</h2>
                {description && <p>{description}</p>}

                {children}

                <BookGrid
                    books={books}
                    selectedBookId={selectedBook?.id}
                    onBookClick={setSelectedBook}
                    renderCardExtra={renderCardExtra}
                />
            </div>

            {(adminSidebarContent || selectedBook) && (
                <div className="catalogue-sidebar">
                    {adminSidebarContent ? (
                        adminSidebarContent
                    ) : (
                        selectedBook && (
                            <BookView
                                book={selectedBook}
                                onClose={() => setSelectedBook(null)}
                                actions={renderViewActions ? renderViewActions(selectedBook) : undefined}
                            />
                        )
                    )}
                </div>
            )}

        </div>
    );
}