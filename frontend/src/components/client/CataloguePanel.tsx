import { useEffect, useState } from 'react';
import '../../pages/Home.css';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { getAllBooks } from '../../services/bookService';
import type { Book } from '../../types/Book';
import { addBookToLibrary } from '../../services/libraryService';

export function CataloguePanel() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [addedBookIds, setAddedBookIds] = useState<number[]>([]);

    useEffect(() => {
        getAllBooks()
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur API Catalogue:", err);
                setError("Impossible de charger le catalogue. Vérifie que le conteneur Docker du Back est bien lancé.");
                setLoading(false);
            });
    }, []);

    const handleAddToLibrary = async (bookId: number) => {
        try {
            await addBookToLibrary(bookId);
            setAddedBookIds((prev) => [...prev, bookId]);
        } catch (err: any) {
            if (err.response && err.response.status === 400) {
                alert("Ce livre est déjà dans votre bibliothèque !");
                setAddedBookIds((prev) => [...prev, bookId]);
            } else {
                console.error("Erreur ajout bibliothèque:", err);
                alert("Une erreur est survenue lors de l'ajout.");
            }
        }
    };

    const renderCatalogueActions = (book: Book) => {
        const isAdded = addedBookIds.includes(book.id);

        return (
            <button
                className={`filter-button ${isAdded ? 'btn-added' : 'active'}`}
                onClick={() => handleAddToLibrary(book.id)}
                disabled={isAdded}
            >
                {isAdded ? 'Ajouté' : 'Ajouter à mes livres'}
            </button>
        );
    };

    if (loading) {
        return (
            <div className="catalogue-layout">
                <div className="catalogue-main">
                    <h2>Catalogue Global</h2>
                    <p>Chargement des livres depuis l'API...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="catalogue-layout">
                <div className="catalogue-main">
                    <h2>Catalogue</h2>
                    <p className="catalogue-error-text">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <BookPanelLayout
            title="Catalogue"
            description="Liste de tous les livres disponibles sur la plateforme."
            books={books}
            renderViewActions={renderCatalogueActions}
        />
    );
}