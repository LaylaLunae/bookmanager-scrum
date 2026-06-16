import api from '../api/axiosInstance';
import type { Book } from '../types/Book';

// Structure de l'objet d'association renvoyé par le GET du Back
export interface LibraryItem {
    id: number;
    status: "A lire" | "En cours" | "Lu";
    book: Book;
}

// Configuration du header d'authentification temporaire exigé par le back (id = 1 par défaut)
const getAuthHeaders = (userId: number = 1) => ({
    headers: { 'X-User-Id': userId.toString() }
});

// Récupérer la bibliothèque personnelle de l'utilisateur
export const getMyLibrary = (userId?: number) => {
    return api.get<LibraryItem[]>('/client/library', getAuthHeaders(userId));
};

// Ajouter un livre du catalogue général à sa bibliothèque
export const addBookToLibrary = (bookId: number, userId?: number) => {
    return api.post<void>(`/client/library/add/${bookId}`, {}, getAuthHeaders(userId));
};

// Modifier le statut de lecture d'un livre de sa bibliothèque
export const updateBookStatus = (bookId: number, status: "A lire" | "En cours" | "Lu", userId?: number) => {
    return api.patch<void>(`/client/library/${bookId}/tag`, { status }, getAuthHeaders(userId));
};