package com.SharkRex.Ecomm.Service;
import com.SharkRex.Ecomm.Models.Products;
import com.SharkRex.Ecomm.Repository.ProductRepo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service 
public class ProductService {
    @Autowired 
    ProductRepo productRepo;

    public List<Products> getProductDetails() {
        return productRepo.findAll();
    }

    public String addProduct(List<Products> product) {
        productRepo.saveAll(product);
        return "Product added successfully";
    }
}
