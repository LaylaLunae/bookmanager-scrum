import { useState } from 'react';
import { InputField } from '../shared/InputField';
import { createBook } from '../../services/bookService';
import './AddBookForm.css';

interface AddBookFormProps {
    onBookAdded: () => void;
    onCancel: () => void;
}

export function AddBookForm({ onBookAdded, onCancel }: AddBookFormProps) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');

    const [coverName, setCoverName] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setCoverName(file.name);

            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if (!title.trim() || !author.trim() || !genre.trim() || !summary.trim() || !coverName) {
            setErrorMessage("Veuillez remplir tous les champs !");
            return;
        }

        setIsSubmitting(true);

        const shortCoverUrl = `http://localhost:8080/uploads/${coverName}`;

        const bookPayload = {
            title,
            author,
            genre,
            summary,
            cover: shortCoverUrl
        };

        try {
            await createBook(bookPayload);

            setTitle('');
            setAuthor('');
            setGenre('');
            setSummary('');
            setCoverName('');
            setPreviewUrl('');
            setIsSubmitting(false);
            onBookAdded();
        } catch (error: any) {
            setIsSubmitting(false);
            if (error.response && error.response.data) {
                setErrorMessage(typeof error.response.data === 'string' ? error.response.data : "Erreur de validation de l'API.");
            } else {
                setErrorMessage("Une erreur est survenue lors de l'ajout du livre.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-book-form-container">
            <div className="form-fixed-header">
                <h3>Nouveau livre</h3>
                <div className="form-actions">
                    <button type="button" className="filter-button" onClick={onCancel} disabled={isSubmitting}>
                        Annuler
                    </button>
                    <button type="submit" className="filter-button active" disabled={isSubmitting}>
                        {isSubmitting ? '...' : 'Sauvegarder'}
                    </button>
                </div>
            </div>

            <div className="form-scrollable-body">
                {errorMessage && <p className="auth-error-message">{errorMessage}</p>}

                <div className="auth-form-group">
                    <InputField
                        label="Titre du livre"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <InputField
                        label="Auteur"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <InputField
                        label="Genre (ex: fantasy, policier...)"
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    />
                </div>

                <div className="auth-form-group">
                    <label className="required-label">Image de couverture</label>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            id="file-upload"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-upload" className="file-upload-button">
                            {coverName ? "Modifier l'image" : "Choisir un fichier"}
                        </label>
                        {coverName && <span className="file-name-indicator" style={{ color: '#7c7c8a', fontSize: '0.85rem' }}>{coverName}</span>}
                    </div>

                    {previewUrl && (
                        <div className="form-image-preview" style={{ marginTop: '0.75rem' }}>
                            <img
                                src={previewUrl}
                                alt="Aperçu couverture"
                                style={{ width: '100px', height: '135px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #29292e' }}
                            />
                        </div>
                    )}
                </div>

                <div className="auth-form-group">
                    <label className="required-label">Résumé</label>
                    <textarea
                        rows={5}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                </div>
            </div>
        </form>
    );
}