package com.SharkRex.Ecomm.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.SharkRex.Ecomm.Models.Products;

@Repository 
public interface ProductRepo extends JpaRepository<Products, Integer> {

    @Query ("SELECT p FROM Products p WHERE " + 
    "LOWER(p.productName) LIKE LOWER(CONCAT('%', :keyword, '%'))"+
    "OR LOWER(p.productDesc) LIKE LOWER(CONCAT('%', :keyword, '%'))"+
    "OR LOWER(p.productCategory) LIKE LOWER(CONCAT('%', :keyword, '%'))"+
    "OR LOWER(p.productBrand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    public List<Products> findByProductNameContainingIgnoreCase(String keyword);

}
