import api from '../api/axiosInstance';
import type { Book } from '../types/Book';

// Récupérer tous les livres (Public)
export const getAllBooks = () => {
    return api.get<Book[]>('/books');
};

// Créer un livre (Admin)
export const createBook = (bookData: Omit<Book, 'id'>) => {
    return api.post<Book>('/admin/books', bookData);
};

// Modifier un livre (Admin)
export const updateBook = (id: number, bookData: Omit<Book, 'id'>) => {
    return api.put<Book>(`/admin/books/${id}`, bookData);
};

// Supprimer un livre (Admin)
export const deleteBook = (id: number) => {
    return api.delete<void>(`/admin/books/${id}`);
};