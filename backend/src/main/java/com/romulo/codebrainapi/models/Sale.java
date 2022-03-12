package com.romulo.codebrainapi.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Data
@Document
public class Sale {
    @Id
    private String id;

    private String operatorId;
    private Map<String, Integer> products = new HashMap<>();

    private double totalPrice;

    private LocalDateTime time = LocalDateTime.now();
}
