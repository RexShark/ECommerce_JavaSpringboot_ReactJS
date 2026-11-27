package com.SharkRex.Ecomm.Service;
import com.SharkRex.Ecomm.Models.Products;
import com.SharkRex.Ecomm.Repository.ProductRepo;

import java.util.List;

import org.springframework.stereotype.Service;

@Service 
public class ProductService {
    private final ProductRepo productRepo;

    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public List<Products> getProductDetails() {
        return productRepo.findAll();
    }

    public String addProduct(Products product) {
        productRepo.save(product);
        return "Product added successfully";
    }

    public String updateProduct(int id, Products product) {
       if (!productRepo.existsById(id)) {
        return "Product not found";
    }
    product.setProductId(id);
    productRepo.save(product);
    return "Product updated successfully";
    }

    public Products getProduct(int id) {
        return productRepo.findById(id).orElse(null);
    }

    public boolean deleteProduct(int id) {
        if (!productRepo.existsById(id)) return false;
        productRepo.deleteById(id);
        return true;
    }

    public List<Products> searchProducts(String keyword) {
        return productRepo.findByProductNameContainingIgnoreCase(keyword);
    }
}
