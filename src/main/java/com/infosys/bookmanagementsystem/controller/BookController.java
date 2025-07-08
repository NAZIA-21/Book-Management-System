package com.infosys.bookmanagementsystem.controller;

import com.infosys.bookmanagementsystem.model.Book;
import com.infosys.bookmanagementsystem.model.BookResponse;
import com.infosys.bookmanagementsystem.service.BookService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@CrossOrigin(origins = {"http://localhost:5500", "http://127.0.0.1:5500"})
@RestController
@RequestMapping("/book")
public class BookController {

    BookService bookService;

    public BookController(BookService bookService){
        this.bookService= bookService;
    }

    @PostMapping
    public ResponseEntity<BookResponse> createBook(@RequestBody Book book){
        bookService.createBook(book);
        BookResponse response = new BookResponse();
        response.setStatusCode(201);
        response.setStatusMessage("Book added successfully");
        response.setResponseDate(LocalDate.now());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<Book> getBookById(@PathVariable int bookId){
        Book book = bookService.getBookById(bookId);
        return ResponseEntity.ok(book);
    }

    @GetMapping("/genre")
    public ResponseEntity<List<Book>> getBooksByGenre(@RequestParam String genre) {
        List<Book> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/searchBook")
    public Book getBook(@RequestParam int bookId){
        return bookService.getBookById(bookId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable int id, @RequestBody Book book){
        book.setBookId(id);
        bookService.updateBook(book);
        BookResponse response = new BookResponse();
        response.setStatusCode(200);
        response.setStatusMessage("Book updated successfully");
        response.setResponseDate(LocalDate.now());
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<String> deleteBook(@PathVariable int bookId) {
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("Book deleted successfully");
    }
}
