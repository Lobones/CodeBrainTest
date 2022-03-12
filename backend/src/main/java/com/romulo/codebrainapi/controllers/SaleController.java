package com.romulo.codebrainapi.controllers;

import com.romulo.codebrainapi.models.Sale;
import com.romulo.codebrainapi.services.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/sales")
@AllArgsConstructor
public class SaleController {
    private final SaleService saleService;

    @GetMapping("/getAll")
    public List<Sale> fetchAll() {
        return saleService.getAllSales();
    }

    @GetMapping("/{id}")
    public Sale getById(@PathVariable String id) {
        return saleService.getById(id);
    }

    @PostMapping("/new")
    public String createSale(@RequestBody Sale sale) {
        return saleService.createSale(sale);
    }

    @DeleteMapping("/delete/{id}")
    public Boolean deleteSale(@PathVariable String id) {
        return saleService.deleteSale(id);
    }

    @GetMapping("/getTopSaleByPrice")
    public Sale getTopSaleByPrice() {
        return saleService.getTopSaleByPrice();
    }
}
