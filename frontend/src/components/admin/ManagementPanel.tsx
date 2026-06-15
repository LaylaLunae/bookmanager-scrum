import '../../pages/Home.css';
import { BookPanelLayout } from '../shared/BookPanelLayout';
import { MOCK_BOOKS } from '../../mocks/MockBook';
import type { Book } from '../../types/Book';

export function ManagementPanel() {

    const renderManagementActions = (book: Book) => (
        <div className="management-actions-group">
            <button
                className="filter-button active edit-btn"
                onClick={() => alert(`Modifier : ${book.title}`)}
            >
                Modifier
            </button>
            <button
                className="filter-button active delete-btn"
                onClick={() => alert(`Supprimer : ${book.title}`)}
            >
                Supprimer
            </button>
        </div>
    );

    return (
        <BookPanelLayout
            title="Espace Gestion"
            books={MOCK_BOOKS}
            renderViewActions={renderManagementActions}
        >
            <div className="placeholder-box admin-zone">
                <h3>[ Zone d'ajout d'un livre ]</h3>
                <p>Formulaire pour ajouter un nouveau livre au catalogue.</p>
            </div>
        </BookPanelLayout>
    );
}