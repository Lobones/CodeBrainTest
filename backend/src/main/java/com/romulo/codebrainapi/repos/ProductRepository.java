package com.romulo.codebrainapi.repos;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {

}
