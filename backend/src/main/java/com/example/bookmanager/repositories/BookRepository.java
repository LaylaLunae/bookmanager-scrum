package com.example.bookmanager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookmanager.models.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Cette méthode nous servira pour la Story "Ajout de livre" (règle métier doublon)
    boolean existsByTitleAndAuthor(String title, String author);
}