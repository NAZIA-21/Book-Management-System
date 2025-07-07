package com.infosys.bookmanagementsystem.exception;

public class BookException extends RuntimeException{

    public BookException(){
    }

    public BookException(int bookId){
        super("Cannot find book with this id.");
    }
}
