package com.romulo.codebrainapi.repos;

import com.romulo.codebrainapi.models.Sale;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SaleRepository extends MongoRepository<Sale, String> {

}
