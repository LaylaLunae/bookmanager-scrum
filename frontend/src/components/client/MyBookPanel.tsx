import '../../pages/Home.css';
import { useState } from 'react';

interface MyBooksPanelProps {
    onSelectBook: (bookName: string) => void;
}

export function MyBooksPanel({ onSelectBook }: MyBooksPanelProps) {
    const [activeFilter, setActiveFilter] = useState<'all' | 'todo' | 'doing' | 'done'>('all');

    return (
        <div>
            <h2>Mes Livres</h2>

            <div className="filter-bar">
                <button className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>Tous mes livres</button>
                <button className={`filter-button ${activeFilter === 'todo' ? 'active' : ''}`} onClick={() => setActiveFilter('todo')}>À lire</button>
                <button className={`filter-button ${activeFilter === 'doing' ? 'active' : ''}`} onClick={() => setActiveFilter('doing')}>En cours</button>
                <button className={`filter-button ${activeFilter === 'done' ? 'active' : ''}`} onClick={() => setActiveFilter('done')}>Lus</button>
            </div>

            <div className="placeholder-box">
                [ Emplacement de mes livres filtrés : {activeFilter} ]
                <br /><br />
                <button onClick={() => onSelectBook("Harry Potter")} className="filter-button active">
                    Simuler la sélection d'un livre
                </button>
            </div>
        </div>
    );
}