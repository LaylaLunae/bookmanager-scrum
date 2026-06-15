import { useEffect, useState } from 'react';
import '../../pages/Home.css';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { getAllBooks } from '../../services/bookService';
import type { Book } from '../../types/Book';

export function CataloguePanel() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Chargement des données au montage du composant
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

    // Action de la sidebar
    const renderCatalogueActions = (book: Book) => (
        <button
            className="filter-button active"
            onClick={() => alert(`Ajout de "${book.title}" à ma bibliothèque (Story à venir)`)}
        >
            Ajouter à mes livres
        </button>
    );

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
                    <h2>Catalogue Global</h2>
                    <p style={{ color: '#f75a68' }}>{error}</p>
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