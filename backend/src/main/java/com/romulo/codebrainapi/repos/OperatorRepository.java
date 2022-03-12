package com.romulo.codebrainapi.repos;

import com.romulo.codebrainapi.models.Operator;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OperatorRepository extends MongoRepository<Operator, String> {
    Optional<Operator> findOperatorByFirstName(String firstName);
    Optional<Operator> findOperatorByLastName(String lastName);
}
