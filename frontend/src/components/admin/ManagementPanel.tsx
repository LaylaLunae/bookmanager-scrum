import '../../pages/Home.css';

interface ManagementPanelProps {
    onSelectBook: (bookName: string) => void;
}

export function ManagementPanel({ onSelectBook }: ManagementPanelProps) {
    return (
        <div>
            <h2>Espace Gestion</h2>
            <div className="placeholder-box" style={{ borderColor: '#4f46e5' }}>
                <h3>[ Zone d'ajout d'un livre ]</h3>
                <p>Formulaire pour ajouter un nouveau livre au catalogue.</p>
            </div>
            <div className="placeholder-box">
                [ Table de gestion du Catalogue ]
                <br /><br />
                <button onClick={() => onSelectBook("L'Étranger - Mode Édition")} className="filter-button active">
                    Simuler la sélection d'un livre à modifier/supprimer
                </button>
            </div>
        </div>
    );
}