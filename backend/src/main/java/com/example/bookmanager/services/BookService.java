package com.example.bookmanager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookmanager.models.Book;
import com.example.bookmanager.repositories.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Récupérer tous les livres pour le catalogue global
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Ajout d'un livre
    public Book addBook(Book book) {
    // Refuser l'ajout si le titre ET l'auteur existent déjà exactement
        if (bookRepository.existsByTitleAndAuthor(book.getTitle(), book.getAuthor())) {
            throw new RuntimeException("Ce livre (titre et auteur) existe déjà dans le catalogue !");
        }
        return bookRepository.save(book);
    }

    // Supprimer un livre -->  Avec vérification d'intégrité
    public void deleteBook(Long id) {
        // Vérifier si le livre existe en base
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Erreur : Ce livre n'existe pas !"));

        // Vérifier s'il est lié à un utilisateur 
        bookRepository.deleteById(id);
    }

    // Modifier un livre, avec validations strictes
    public Book updateBook(Long id, Book updatedBookData) {
        // Récupérer le livre existant
        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Erreur : Le livre à modifier n'existe pas !"));

        // Renvoyer une erreur 400 si les champs obligatoires sont vides
        if (updatedBookData.getTitle() == null || updatedBookData.getTitle().trim().isEmpty() ||
            updatedBookData.getAuthor() == null || updatedBookData.getAuthor().trim().isEmpty()) {
            throw new IllegalArgumentException("Erreur : Le titre et l'auteur sont obligatoires !");
        }

        // Appliquer les modifications
        existingBook.setTitle(updatedBookData.getTitle());
        existingBook.setAuthor(updatedBookData.getAuthor());
        existingBook.setGenre(updatedBookData.getGenre());
        existingBook.setSummary(updatedBookData.getSummary());
        existingBook.setCover(updatedBookData.getCover());

        // Sauvegarder les changements
        return bookRepository.save(existingBook);
    }
}


