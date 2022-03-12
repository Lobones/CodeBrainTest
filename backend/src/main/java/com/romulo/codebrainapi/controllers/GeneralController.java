package com.romulo.codebrainapi.controllers;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.models.Sale;
import com.romulo.codebrainapi.services.OperatorService;
import com.romulo.codebrainapi.services.ProductService;
import com.romulo.codebrainapi.services.SaleService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/v1/general")
@AllArgsConstructor
public class GeneralController {
    private final OperatorService operatorService;
    private final ProductService productService;
    private final SaleService saleService;

    private final int OPS_START_ID = 0;
    private final int OPS_TO_PERSIST = 10;

    private final int PRODUCTS_START_ID = 0;
    private final int PRODUCTS_TO_PERSIST = 20;

    private final int SALES_START_ID = 0;
    private final int SALES_TO_PERSIST = 30;


    @GetMapping("/generateData")
    public String generateData() {
        for (int i = OPS_START_ID; i < OPS_TO_PERSIST; i++) {
            Operator operator = new Operator("Usuário" + i, "UserTest" + i);
            operator.setId("testuserId" + i);
            operatorService.createOperator(operator);
        }

        for (int i = PRODUCTS_START_ID; i < PRODUCTS_TO_PERSIST; i++) {
            Product product = new Product();
            product.setId("productId" + i);
            product.setTitle("Produto " + i);
            product.setDescription("Descrição do produto " + i);
            product.setStock(new Random().ints(100, 1000).findFirst().getAsInt());
            product.setPrice((float) new Random().doubles(25, 350).findFirst().getAsDouble());

            productService.createProduct(product);
        }

        for (int i = SALES_START_ID; i < SALES_TO_PERSIST; i++) {
            int operatorId = new Random().ints(OPS_START_ID, OPS_START_ID + OPS_TO_PERSIST).findFirst().getAsInt();
            int productId = new Random().ints(PRODUCTS_START_ID, PRODUCTS_START_ID + PRODUCTS_TO_PERSIST).findFirst().getAsInt();
            int productAmount = new Random().ints(3, 25).findFirst().getAsInt();

            Sale sale = new Sale();
            sale.setId("testsaleId" + i);
            sale.setOperatorId("testuserId" + operatorId);
            sale.getProducts().put("productId" + productId, productAmount);
            saleService.createSale(sale);
        }


        return "OK";
    }
}
