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

    public String updateProduct(int id, Products product) {
       if (!productRepo.existsById(id)) {
        return "Product not found";
    }
    product.setProductId(id);
    productRepo.save(product);
    return "Product updated successfully";
    }
}
