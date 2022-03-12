package com.romulo.codebrainapi.services;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.models.Sale;
import com.romulo.codebrainapi.repos.OperatorRepository;
import com.romulo.codebrainapi.repos.SaleRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class OperatorService {

    @Autowired
    private final OperatorRepository operatorRepository;

    @Autowired
    private final SaleRepository saleRepository;

    public List<Operator> getAllOperators() {
        return operatorRepository.findAll();
    }

    public Operator getById(String id) {
        return operatorRepository.findById(id).orElseThrow(() -> new Error("Not found"));
    }

    public Operator getTopSaleOperatorByAmount() {
        Operator topSaleOperator = null;

        for (Operator operator : getAllOperators()) {
            if (topSaleOperator == null)
                topSaleOperator = operator;
            else {
                topSaleOperator = operator.getSales().size() > topSaleOperator.getSales().size() ? operator : topSaleOperator;
            }
        }

        return topSaleOperator;
    }

    public Operator getTopSaleOperatorByEarnings() {
        Operator topSaleOperator = null;

        for (Operator operator : getAllOperators()) {
            if (topSaleOperator == null)
                topSaleOperator = operator;
            else {
                double currentOperatorSales = operator.getSales().stream().mapToDouble(value -> saleRepository.findById(value).orElseThrow(() -> new Error("Not found")).getTotalPrice()).sum();
                double topSaleOperatorSales = topSaleOperator.getSales().stream().mapToDouble(value -> saleRepository.findById(value).orElseThrow(() -> new Error("Not found")).getTotalPrice()).sum();

                topSaleOperator = currentOperatorSales > topSaleOperatorSales ? operator : topSaleOperator;
            }
        }

        return topSaleOperator;
    }

    public String createOperator(Operator operator) {
        return operatorRepository.insert(operator).getId();
    }

    public Operator updateOperator(Operator operator) {
        return operatorRepository.save(operator);
    }

    public boolean deleteOperator(String id) {
        if (operatorRepository.findById(id).isPresent()) {
            Operator operator = operatorRepository.findById(id).get();

            operator.getSales().forEach(saleId -> {
                if (saleRepository.findById(saleId).isPresent()) {
                    Sale sale = saleRepository.findById(saleId).get();
                    sale.setOperatorId("REMOVED_" + sale.getOperatorId());
                    saleRepository.save(sale);
                }
            });

            operatorRepository.delete(operator);
            return true;
        }

        return false;
    }
}
