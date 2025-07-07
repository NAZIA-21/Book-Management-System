package com.infosys.bookmanagementsystem.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {

    private int statusCode;
    private String statusMessage;
    private LocalDate responseDate;

}
