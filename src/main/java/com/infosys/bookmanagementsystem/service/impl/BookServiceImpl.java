package com.infosys.bookmanagementsystem.service.impl;

import com.infosys.bookmanagementsystem.exception.BookException;
import com.infosys.bookmanagementsystem.model.Book;
import com.infosys.bookmanagementsystem.repository.BookRepository;
import com.infosys.bookmanagementsystem.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository){
        this.bookRepository= bookRepository;
    }

    @Override
    public String createBook(Book book) {
        bookRepository.save(book);
        return "Successfully added the book.";
    }

    @Override
    public String updateBook(Book book) {
        bookRepository.save(book);
        return "Successfully updated the book";
    }

    @Override
    public String deleteBook(int bookId) {
        bookRepository.deleteById(bookId);
        return "Deleted the book successfully";
    }

    @Override
    public Book getBookById(int bookId) {
        if(bookRepository.findById(bookId).isEmpty())
            throw new BookException(bookId);
        return bookRepository.findById(bookId).get();
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findByGenreIgnoreCase(genre);
    }

}
