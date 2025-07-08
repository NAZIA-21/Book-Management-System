package com.infosys.bookmanagementsystem.repository;

import com.infosys.bookmanagementsystem.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByGenreIgnoreCase(String genre);
}
