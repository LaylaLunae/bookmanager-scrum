package com.example.bookmanager.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookmanager.models.Book;
import com.example.bookmanager.models.User;
import com.example.bookmanager.models.UserBook;
import com.example.bookmanager.repositories.BookRepository;
import com.example.bookmanager.repositories.UserBookRepository;
import com.example.bookmanager.repositories.UserRepository;

@Service
public class ClientLibraryService {

    @Autowired
    private UserBookRepository userBookRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    //  Ajouter un livre à la bibliothèque (Statut initial par défaut : "A lire")
    public UserBook addBookToLibrary(Long userId, Long bookId) {
        // Éviter d'ajouter deux fois le même livre
        if (userBookRepository.findByUserIdAndBookId(userId, bookId).isPresent()) {
            throw new RuntimeException("Ce livre est déjà dans votre bibliothèque !");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Livre non trouvé"));

        UserBook userBook = new UserBook(user, book, "A lire");
        return userBookRepository.save(userBook);
    }

    // Voir la bibliothèque personnelle du client
    public List<UserBook> getUserLibrary(Long userId) {
        return userBookRepository.findByUserId(userId);
    }

    // Modifier le statut (PATCH)
    public UserBook updateBookStatus(Long userId, Long bookId, String newStatus) {
        // Validation stricte du cahier des charges
        List<String> validStatuses = Arrays.asList("A lire", "En cours", "Lu");
        if (!validStatuses.contains(newStatus)) {
            throw new IllegalArgumentException("Statut invalide ! Choisissez parmi : A lire, En cours, Lu");
        }

        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new RuntimeException("Ce livre ne fait pas partie de votre bibliothèque"));

        userBook.setStatus(newStatus);
        return userBookRepository.save(userBook);
    }

    // Supprimer un livre de sa bibliothèque
    public void removeBookFromLibrary(Long userId, Long bookId) {
        UserBook userBook = userBookRepository.findByUserIdAndBookId(userId, bookId)
                .orElseThrow(() -> new RuntimeException("Ce livre ne fait pas partie de votre bibliothèque"));

        userBookRepository.delete(userBook);
    }
}