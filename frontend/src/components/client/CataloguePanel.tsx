import '../../pages/Home.css';

interface CataloguePanelProps {
    onSelectBook: (bookName: string) => void;
}

export function CataloguePanel({ onSelectBook }: CataloguePanelProps) {
    return (
        <div>
            <h2>Catalogue Global</h2>
            <p>Liste de tous les livres de la plateforme.</p>
            <div className="placeholder-box">
                [ Emplacement du futur catalogue ]
                <br /><br />
                <button onClick={() => onSelectBook("Le Seigneur des Anneaux")} className="filter-button active">
                    Simuler la sélection d'un livre
                </button>
            </div>
        </div>
    );
}