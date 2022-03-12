package com.romulo.codebrainapi.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document
public class Operator {
    @Id
    private String id;

    private String firstName;
    private String lastName;

    private List<String> sales = List.of();

    private double averageSalesRevenue = 0.0D;

    public Operator(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
