package com.romulo.codebrainapi.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Product {
    @Id
    private String id;

    private String title = "Não definido";
    private String description = "Não há mais informações";

    private float price = 0f;
    private int sales = 0;
    private int stock = 0;

    private double averageTicket = 0.0D;
}
