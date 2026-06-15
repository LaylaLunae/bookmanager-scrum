import '../../pages/Home.css';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { MOCK_BOOKS } from '../../mocks/MockBook';
import type { Book } from '../../types/Book';

export function CataloguePanel() {
    const renderCatalogueActions = (book: Book) => (
        <button
            className="filter-button active"
            onClick={() => alert(`Ajout de "${book.title}" à ma bibliothèque`)}
        >
            Ajouter à mes livres
        </button>
    );

    return (
        <BookPanelLayout
            title="Catalogue Global"
            description="Liste de tous les livres de la plateforme."
            books={MOCK_BOOKS}
            renderViewActions={renderCatalogueActions}
        />
    );
}