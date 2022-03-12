package com.romulo.codebrainapi.services;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.models.Sale;
import com.romulo.codebrainapi.repos.OperatorRepository;
import com.romulo.codebrainapi.repos.ProductRepository;
import com.romulo.codebrainapi.repos.SaleRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final OperatorRepository operatorRepository;
    private final ProductRepository productRepository;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale getById(String id) {
        return saleRepository.findById(id).orElseThrow(() -> new Error("Not found"));
    }

    public Sale getTopSaleByPrice() {
        Sale topSaleByPrice = null;

        for (Sale sale : getAllSales()) {
            if (topSaleByPrice == null)
                topSaleByPrice = sale;
            else {
                topSaleByPrice = sale.getTotalPrice() > topSaleByPrice.getTotalPrice() ? sale : topSaleByPrice;
            }
        }

        return topSaleByPrice;
    }

    public String createSale(Sale sale) {
        Sale saleWithId = saleRepository.insert(sale);
        String operatorId = sale.getOperatorId();

        if (!sale.getProducts().isEmpty()) {
            sale.getProducts().forEach((productId, amount) -> {
                if (productRepository.findById(productId).isPresent()) {
                    Product product = productRepository.findById(productId).get();

                    if (product.getStock() < amount) {
                        saleRepository.delete(saleWithId);
                        throw new Error("Quantity exceeds current stock");
                    }

                    saleWithId.setTotalPrice(saleWithId.getTotalPrice() + (product.getPrice() * amount));
                    product.setSales(product.getSales() + amount);
                    product.setStock(product.getStock() - amount);
                    product.setAverageTicket((product.getSales() * product.getPrice()) / (getAllSales().size() * 1.0D));

                    saleRepository.save(saleWithId);
                    productRepository.save(product);
                }
            });
        }

        if (operatorRepository.findById(operatorId).isPresent()) {
            Operator operator = operatorRepository.findById(operatorId).get();
            operator.getSales().add(saleWithId.getId());
            operator.setAverageSalesRevenue(operator.getSales().stream().mapToDouble(currentSaleId -> getById(currentSaleId).getTotalPrice()).sum() / operator.getSales().size());
            operatorRepository.save(operator);
        }

        return saleWithId.getId();
    }

    public boolean deleteSale(String id) {
        if (saleRepository.findById(id).isPresent()) {
            Sale sale = saleRepository.findById(id).get();

            if (operatorRepository.findById(sale.getOperatorId()).isPresent()) {
                Operator operator = operatorRepository.findById(sale.getOperatorId()).get();
                operator.getSales().remove(sale.getId());
                operator.setAverageSalesRevenue(operator.getSales().stream().mapToDouble(currentSaleId -> getById(currentSaleId).getTotalPrice()).sum() / operator.getSales().size());
                operatorRepository.save(operator);
            }

            sale.getProducts().forEach((productId, amount) -> {
                if (productRepository.findById(productId).isPresent()) {
                    Product product = productRepository.findById(productId).get();
                    product.setSales(product.getSales() - amount);
                    product.setStock(product.getStock() + amount);
                    product.setAverageTicket((product.getSales() * product.getPrice()) / (getAllSales().size() * 1.0D));

                    productRepository.save(product);
                }
            });

            saleRepository.delete(sale);
            return true;
        }

        return false;
    }
}
