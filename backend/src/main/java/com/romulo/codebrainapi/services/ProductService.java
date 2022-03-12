package com.romulo.codebrainapi.services;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.repos.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@AllArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getById(String id) {
        return productRepository.findById(id).orElseThrow(() -> new Error("Not found"));
    }

    public Product getTopAverageTicketProduct() {
        Product topAverageTicketProduct = null;

        for (Product product : getAllProducts()) {
            if (topAverageTicketProduct == null)
                topAverageTicketProduct = product;
            else {
                topAverageTicketProduct = product.getAverageTicket() > topAverageTicketProduct.getAverageTicket() ? product : topAverageTicketProduct;
            }
        }

        return topAverageTicketProduct;
    }

    public List<String> getLowStockProducts() {
        List<Product> allProducts = getAllProducts();
        allProducts.sort(Comparator.comparingInt(Product::getStock));

        return Arrays.asList(allProducts.get(0).getId(), allProducts.get(1).getId(), allProducts.get(2).getId());
    }

    public String createProduct(Product product) {
        return productRepository.insert(product).getId();
    }

    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    public boolean deleteProduct(String id) {
        if (productRepository.findById(id).isPresent()) {
            Product product = productRepository.findById(id).get();
            productRepository.delete(product);
            return true;
        }

        return false;
    }
}
