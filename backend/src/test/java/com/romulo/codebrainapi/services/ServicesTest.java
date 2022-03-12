package com.romulo.codebrainapi.services;

import com.romulo.codebrainapi.models.Operator;
import com.romulo.codebrainapi.models.Product;
import com.romulo.codebrainapi.models.Sale;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Tests for Services")
@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class ServicesTest {

    @Autowired
    @InjectMocks
    OperatorService operatorService;

    @Autowired
    @InjectMocks
    ProductService productService;

    @Autowired
    @InjectMocks
    SaleService saleService;

    @Test
    @Order(1)
    void createAndPersist_Operator() {
        Operator operator = new Operator("TestUser", "UserTest");
        operator.setId("justtestUserId");
        operatorService.createOperator(operator);

        assertEquals(operator.getFirstName(), operatorService.getById(operator.getId()).getFirstName());
        assertEquals(operator.getLastName(), operatorService.getById(operator.getId()).getLastName());
    }

    @Test
    @Order(2)
    void createAndPersist_Product() {
        Product product = new Product();
        product.setId("justtestProductId");
        product.setTitle("Test Product Title");
        product.setDescription("Test Product Description");
        product.setStock(10);
        product.setPrice(35f);

        productService.createProduct(product);

        assertEquals(product.getTitle(), productService.getById(product.getId()).getTitle());
        assertEquals(product.getDescription(), productService.getById(product.getId()).getDescription());
        assertEquals(product.getStock(), productService.getById(product.getId()).getStock());
        assertEquals(product.getPrice(), productService.getById(product.getId()).getPrice());
    }

    @Test
    @Order(3)
    void createAndPersist_Sale() {
        Sale sale = new Sale();
        sale.setId("justtestSaleId");
        sale.setOperatorId("justtestUserId");
        sale.getProducts().put("justtestProductId", 5);
        saleService.createSale(sale);

        assertEquals("justtestUserId", saleService.getById("justtestSaleId").getOperatorId());
        assertEquals(sale.getProducts(), saleService.getById("justtestSaleId").getProducts());
    }

    @Test
    @Order(4)
    void checkData_Sale() {
        assertEquals(saleService.getById("justtestSaleId").getTotalPrice(), 35*5);
        assertEquals(operatorService.getById("justtestUserId").getSales().get(0), "justtestSaleId");
        assertEquals(productService.getById("justtestProductId").getSales(), 5);
        assertEquals(productService.getById("justtestProductId").getStock(), 5);
    }

    @Test
    @Order(5)
    void deleteShouldRemoveData_Sale() {
        Sale sale = saleService.getById("justtestSaleId");
        Map<String, Integer> products = Map.copyOf(saleService.getById("justtestSaleId").getProducts());

        saleService.deleteSale("justtestSaleId");
        assertThrowsExactly(Error.class, () -> saleService.getById("justtestSaleId"));

        products.forEach((productId, amount) -> {
            assertFalse(operatorService.getById(sale.getOperatorId()).getSales().contains(sale.getId()));
            assertEquals(productService.getById(productId).getSales(), 0);
            assertEquals(productService.getById(productId).getStock(), 10);
        });
    }

    @Test
    @Order(6)
    void deleteShouldRemoveData_Product() {
        productService.deleteProduct("justtestProductId");
        assertThrowsExactly(Error.class, () -> productService.getById("justtestProductId"));
    }

    @Test
    @Order(7)
    void deleteShouldRemoveData_Operator() {
        operatorService.deleteOperator("justtestUserId");
        assertThrowsExactly(Error.class, () -> operatorService.getById("justtestUserId"));
    }
}