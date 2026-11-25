package com.SharkRex.Ecomm.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

import com.SharkRex.Ecomm.Service.ProductService;
import com.SharkRex.Ecomm.Models.Products;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    
    @Autowired 
    ProductService productService;

    @GetMapping("/products")
    public List<Products> getProductDetails() {
        return productService.getProductDetails();
    }
    
    @PostMapping("/products/bulk")
    public String addProductDetails(@RequestBody List<Products> prod) {
        return productService.addProduct(prod);
    }
    
}
