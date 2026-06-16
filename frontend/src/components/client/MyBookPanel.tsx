import '../../pages/Home.css';
import { useState, useEffect, useRef } from 'react';
import { BookPanelLayout, type BookPanelLayoutRef } from '../shared/BookPanelLayout';
import { getMyLibrary, removeBookFromLibrary, updateBookStatus, type LibraryItem } from '../../services/libraryService';
import type { Book } from '../../types/Book';
import '../shared/BookGrid.css';

export function MyBooksPanel() {
    const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
    const [activeFilter, setActiveFilter] = useState<'all' | 'A lire' | 'En cours' | 'Lu'>('all');
    const [loading, setLoading] = useState<boolean>(true);

    const layoutRef = useRef<BookPanelLayoutRef>(null);

    const fetchLibrary = () => {
        getMyLibrary()
            .then((response) => {
                setLibraryItems(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur chargement bibliothèque perso :", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLibrary();
    }, []);

    const handleRemoveBook = async (book: Book) => {
        if (window.confirm(`Voulez-vous vraiment retirer "${book.title}" de votre bibliothèque ?`)) {
            try {
                await removeBookFromLibrary(book.id);
                layoutRef.current?.closeSidebar();
                fetchLibrary();
            } catch (err) {
                console.error("Erreur lors de la suppression du livre :", err);
                alert("Impossible de supprimer le livre pour le moment.");
            }
        }
    };

    const handleStatusChange = async (bookId: number, newStatus: "A lire" | "En cours" | "Lu") => {
        try {
            await updateBookStatus(bookId, newStatus);

            setLibraryItems((prevItems) =>
                prevItems.map((item) =>
                    item.book.id === bookId ? { ...item, status: newStatus } : item
                )
            );
        } catch (err) {
            console.error("Erreur lors de la mise à jour du statut :", err);
            alert("Impossible de mettre à jour le statut.");
        }
    };

    const filteredItems = libraryItems.filter(item => {
        if (activeFilter === 'all') return true;
        return item.status === activeFilter;
    });

    const booksToDisplay = filteredItems.map(item => item.book);

    const renderMyBooksActions = (book: Book) => {
        const currentItem = libraryItems.find(item => item.book.id === book.id);
        const currentStatus = currentItem ? currentItem.status : "A lire";

        return (
            <div className="library-actions-row">
                <select
                    value={currentStatus}
                    onChange={(e) => handleStatusChange(book.id, e.target.value as "A lire" | "En cours" | "Lu")}
                    className="filter-button active status-select-dropdown"
                >
                    <option value="A lire">À lire</option>
                    <option value="En cours">En cours</option>
                    <option value="Lu">Lu</option>
                </select>

                <button
                    className="filter-button active delete-btn"
                    onClick={() => handleRemoveBook(book)}
                >
                    Supprimer
                </button>
            </div>
        );
    };

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
            ref={layoutRef}
            title="Mes Livres"
            books={booksToDisplay}
            renderViewActions={renderMyBooksActions}
        >
            <div className="filter-bar">
                <button className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tous mes livres</button>
                <button className={`filter-button ${activeFilter === 'A lire' ? 'active' : ''}`} onClick={() => setActiveFilter('A lire')}>À lire</button>
                <button className={`filter-button ${activeFilter === 'En cours' ? 'active' : ''}`} onClick={() => setActiveFilter('En cours')}>En cours</button>
                <button className={`filter-button ${activeFilter === 'Lu' ? 'active' : ''}`} onClick={() => setActiveFilter('Lu')}>Lus</button>
            </div>

            {booksToDisplay.length === 0 && (
                <div className="no-books-message">
                    <p>Aucun livre ne correspond à ce filtre.</p>
                </div>
            )}
        </BookPanelLayout>
    );
}