package com.romulo.codebrainapi.controllers;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.services.OperatorService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/operators")
@AllArgsConstructor
public class OperatorController {
    private final OperatorService operatorService;

    @GetMapping("/getAll")
    public List<Operator> fetchAll() {
        return operatorService.getAllOperators();
    }

    @GetMapping("/{id}")
    public Operator getById(@PathVariable String id) {
        return operatorService.getById(id);
    }

    @PostMapping("/new")
    public String createOperator(@RequestBody Operator operator) {
        return operatorService.createOperator(operator);
    }

    @PostMapping("/update")
    public Operator updateOperator(@RequestBody Operator operator) {
        return operatorService.updateOperator(operator);
    }

    @DeleteMapping("/{id}")
    public Boolean deleteOperator(@PathVariable String id) {
        return operatorService.deleteOperator(id);
    }

    @GetMapping("/getTopSale/{type}")
    public Operator getTopSaleOperator(@PathVariable String type) {
        Operator operator;

        switch (type) {
            case "BY_AMOUNT":
                operator = operatorService.getTopSaleOperatorByAmount();
                break;
            case "BY_EARNINGS":
                operator = operatorService.getTopSaleOperatorByEarnings();
                break;
            default:
                operator = fetchAll().get(0);
        }

        return operator;
    }
}
