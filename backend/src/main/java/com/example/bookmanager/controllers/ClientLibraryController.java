package com.example.bookmanager.controllers;

import com.example.bookmanager.models.UserBook;
import com.example.bookmanager.services.ClientLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/client/library")
@CrossOrigin(origins = "http://localhost:3000")
public class ClientLibraryController {

    @Autowired
    private ClientLibraryService libraryService;

    // Récupérer "Mes Livres"
    @GetMapping
    public ResponseEntity<List<UserBook>> getMyLibrary(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(libraryService.getUserLibrary(userId));
    }

    // Ajouter un livre à sa bibliothèque
    @PostMapping("/add/{bookId}")
    public ResponseEntity<?> addToLibrary(@RequestHeader("X-User-Id") Long userId, @PathVariable Long bookId) {
        try {
            UserBook userBook = libraryService.addBookToLibrary(userId, bookId);
            return new ResponseEntity<>(userBook, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Modifier l'état de lecture d'un livre
    @PatchMapping("/{bookId}/tag")
    public ResponseEntity<?> updateTag(
            @RequestHeader("X-User-Id") Long userId, 
            @PathVariable Long bookId, 
            @RequestBody Map<String, String> body) {
        try {
            String newStatus = body.get("status");
            UserBook updated = libraryService.updateBookStatus(userId, bookId, newStatus);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST); // 400 si mauvais libellé
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Supprimer un livre de sa bibliothèque personnelle
    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> removeFromLibrary(@RequestHeader("X-User-Id") Long userId, @PathVariable Long bookId) {
        try {
            libraryService.removeBookFromLibrary(userId, bookId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}