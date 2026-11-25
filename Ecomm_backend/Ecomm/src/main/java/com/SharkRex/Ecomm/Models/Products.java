package com.SharkRex.Ecomm.Models;

import java.math.BigDecimal;
import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity 
@Data 
@AllArgsConstructor
@NoArgsConstructor 
@Table(name = "products")
public class Products {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int productId;
    public String productName;
    public String productDesc;
    public BigDecimal productPrice;
    public String productBrand;
    public String productCategory;
    public Date productReleaseDate;
    public boolean productAvailability;
    public int productStock;



}
