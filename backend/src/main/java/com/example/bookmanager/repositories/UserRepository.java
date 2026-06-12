package com.example.bookmanager.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookmanager.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Méthode personnalisée pour trouver un utilisateur par son email
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}