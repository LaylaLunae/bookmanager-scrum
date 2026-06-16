import { useState, useEffect } from 'react';
import { InputField } from '../shared/InputField';
import { createBook, updateBook } from '../../services/bookService';
import type { Book } from '../../types/Book';
import './BookForm.css';

interface BookFormProps {
    bookToEdit?: Book | null;
    existingBooks: Book[];
    onSuccess: () => void;
    onCancel: () => void;
}

export function BookForm({ bookToEdit, existingBooks, onSuccess, onCancel }: BookFormProps) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [summary, setSummary] = useState('');
    const [coverName, setCoverName] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setGenre(bookToEdit.genre);
            setSummary(bookToEdit.summary);
            setPreviewUrl(bookToEdit.cover);

            const parts = bookToEdit.cover.split('/');
            setCoverName(parts[parts.length - 1] || 'Image actuelle');
        }
    }, [bookToEdit]);

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

        if (!title.trim() || !author.trim() || !genre.trim() || !summary.trim() || !previewUrl) {
            setErrorMessage("Veuillez remplir tous les champs !");
            return;
        }

        if (!bookToEdit) {
            const isDuplicate = existingBooks.some(
                (b) => b.title.toLowerCase().trim() === title.toLowerCase().trim()
            );
            if (isDuplicate) {
                setErrorMessage("Ce livre existe déjà dans votre catalogue !");
                return;
            }
        }

        setIsSubmitting(true);

        const finalCoverUrl = coverName && !coverName.includes('Image actuelle')
            ? `http://localhost:8080/uploads/${coverName}`
            : previewUrl;

        const bookPayload = {
            title: title.trim(),
            author: author.trim(),
            genre: genre.trim(),
            summary: summary.trim(),
            cover: finalCoverUrl
        };

        try {
            if (bookToEdit) {
                await updateBook(bookToEdit.id, bookPayload);
            } else {
                await createBook(bookPayload);
            }

            setIsSubmitting(false);
            onSuccess();
        } catch (error: any) {
            setIsSubmitting(false);
            if (error.response && error.response.data) {
                setErrorMessage(typeof error.response.data === 'string' ? error.response.data : "Erreur serveur.");
            } else {
                setErrorMessage("Une erreur est survenue lors de l'enregistrement.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-book-form-container">
            <div className="form-fixed-header">
                <h3>{bookToEdit ? 'Modifier le livre' : 'Nouveau livre'}</h3>
                <div className="form-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="filter-button" onClick={onCancel} disabled={isSubmitting}>
                        Annuler
                    </button>
                    <button type="submit" className="filter-button active" disabled={isSubmitting}>
                        {isSubmitting ? '...' : 'Sauvegarder'}
                    </button>
                </div>
            </div>

            <div className="form-scrollable-body" style={{ paddingBottom: '2.5rem' }}>
                {errorMessage && <p className="auth-error-message" style={{ color: '#e51c44' }}>{errorMessage}</p>}

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
                        label="Genre (ex: Shonen, Fantasy...)"
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
                        {coverName && <span className="file-name-indicator" style={{ color: '#7c7c8a', fontSize: '0.85rem', marginLeft: '0.5rem' }}>{coverName}</span>}
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
                        style={{ width: '100%', background: '#1c1c1f', border: '1px solid #29292e', borderRadius: '4px', color: '#fff', padding: '0.5rem', resize: 'vertical' }}
                    />
                </div>
            </div>
        </form>
    );
}