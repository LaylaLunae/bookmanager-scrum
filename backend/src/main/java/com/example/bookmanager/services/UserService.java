package com.example.bookmanager.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.bookmanager.models.User;
import com.example.bookmanager.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Injection par constructeur (Couplage faible)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Logique d'inscription
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Cet email est déjà utilisé !");
        }
        // Note : Pour une V1 simple, le mot de passe est en clair. 
        // On ajoutera Spring Security / BCrypt dans un prochain Sprint.
        return userRepository.save(user);
    }

    // Logique de connexion
    public User loginUser(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(password)) {
                return user; // Connexion réussie
            }
        }
        throw new RuntimeException("Email ou mot de passe incorrect.");
    }
}