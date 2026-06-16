package com.example.bookmanager.repositories;

import com.example.bookmanager.models.UserBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserBookRepository extends JpaRepository<UserBook, Long> {
    // Récupérer toute la bibliothèque d'un utilisateur spécifique
    List<UserBook> findByUserId(Long userId);

    // Trouver un lien spécifique pour éviter les doublons ou pour le mettre à jour
    Optional<UserBook> findByUserIdAndBookId(Long userId, Long bookId);
}