package com.infosys.bookmanagementsystem.service;

import com.infosys.bookmanagementsystem.model.Book;

import java.util.List;

public interface BookService {
    public String createBook(Book book);

    public String updateBook(Book book);

    public String deleteBook(int bookId);

    public Book getBookById(int bookId);

    public List<Book> getAllBooks();

    List<Book> getBooksByGenre(String genre);
}
