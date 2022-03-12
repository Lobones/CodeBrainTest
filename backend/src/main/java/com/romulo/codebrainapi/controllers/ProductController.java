package com.romulo.codebrainapi.controllers;

import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/getAll")
    public List<Product> fetchAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable String id) {
        return productService.getById(id);
    }

    @PostMapping("/new")
    public String createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean deleteSale(@PathVariable String id) {
        return productService.deleteProduct(id);
    }

    @GetMapping("/getTopAverageTicket")
    public Product getTopAverageTicketProduct() {
        return productService.getTopAverageTicketProduct();
    }

    @GetMapping("/getLowStock")
    public List<String> getLowStockProducts() {
        return productService.getLowStockProducts();
    }
}
