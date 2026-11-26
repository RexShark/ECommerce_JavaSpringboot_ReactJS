package com.SharkRex.Ecomm.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.SharkRex.Ecomm.Service.ProductService;
import com.SharkRex.Ecomm.Models.Products;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Products>> getProductDetails() {
        return new ResponseEntity<>(productService.getProductDetails(), HttpStatus.OK);
    }
    

    @PostMapping("/products")
    public String addProductDetail(@RequestBody Products prod) {
        return productService.addProduct(prod);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Products> getProduct(@PathVariable int id) {
        return new ResponseEntity<>(productService.getProduct(id),HttpStatus.OK);
    }
    

    @PutMapping("/products/{id}")
    public String updateProductDetails(@PathVariable int id, @RequestBody Products prod) {
        return productService.updateProduct(id, prod);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        boolean deleted = productService.deleteProduct(id);
        if (!deleted) return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
    }
    
}
