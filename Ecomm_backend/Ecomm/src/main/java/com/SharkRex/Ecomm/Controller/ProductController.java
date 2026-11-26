package com.SharkRex.Ecomm.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.SharkRex.Ecomm.Service.ProductService;
import com.SharkRex.Ecomm.Models.Products;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    
    @Autowired 
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Products>> getProductDetails() {
        return new ResponseEntity<>(productService.getProductDetails(), HttpStatus.OK);
    }
    
    @PostMapping("/products/bulk")
    public String addProductDetails(@RequestBody List<Products> prod) {
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
    
}
