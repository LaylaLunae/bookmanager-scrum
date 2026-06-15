package com.example.bookmanager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookmanager.models.Book;
import com.example.bookmanager.services.BookService;

// pour voir la BDD : http://localhost:8080/api/books

@RestController
@RequestMapping("/api/admin/books")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminBookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        try {
            Book newBook = bookService.addBook(book);
            return new ResponseEntity<>(newBook, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Renvoie une erreur 400 Bad Request avec le message d'erreur si c'est un doublon
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


    // Route pour la modification (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody Book book) {
        try {
            Book modifiedBook = bookService.updateBook(id, book);
            return ResponseEntity.ok(modifiedBook); // Renvoie le livre modifié (200 OK)
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST); // 400 si champs vides
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND); // 404 si ID introuvable
        }
    }

    // Route pour la SUPPRESSION (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok("Le livre a été supprimé avec succès !");
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND); // 404 si ID introuvable
        }
    }
}