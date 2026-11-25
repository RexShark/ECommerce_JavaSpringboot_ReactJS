INSERT INTO products (product_id, product_name, product_desc, product_price, product_brand, product_category, product_release_date, product_availability, product_stock) VALUES
(1, 'iPhone 15', '128GB, Black, A16 Bionic chip', 79999.99, 'Apple', 'Mobiles', '2023-09-22', true, 50),
(2, 'Galaxy S24', '256GB, Onyx Black, Snapdragon 8 Gen 3', 74999.00, 'Samsung', 'Mobiles', '2024-01-31', true, 35),
(3, 'MacBook Air M2', '13-inch, 8GB RAM, 256GB SSD, Midnight', 99900.00, 'Apple', 'Laptops', '2022-07-15', true, 20),
(4, 'Sony WH-1000XM5', 'Wireless noise cancelling headphones, 30h battery', 29990.00, 'Sony', 'Headphones', '2022-05-20', true, 75),
(5, 'Dell XPS 15', 'Intel Core i7, 16GB RAM, 512GB SSD, 15.6-inch OLED', 149990.00, 'Dell', 'Laptops', '2023-03-10', false, 0),
(6, 'OnePlus 12', '256GB, Flowy Emerald, Snapdragon 8 Gen 3', 64999.00, 'OnePlus', 'Mobiles', '2024-01-23', true, 40),
(7, 'Bose QuietComfort 45', 'Wireless noise cancelling headphones, 24h battery', 27900.00, 'Bose', 'Headphones', '2021-09-23', true, 30),
(8, 'HP Pavilion 14', 'Intel Core i5, 16GB RAM, 512GB SSD, 14-inch FHD', 69990.00, 'HP', 'Laptops', '2023-06-01', true, 25),
(9, 'iPad Air 5', '10.9-inch, 64GB, M1 chip, Wi-Fi', 59900.00, 'Apple', 'Tablets', '2022-03-18', true, 18),
(10, 'JBL Flip 6', 'Portable Bluetooth speaker, IP67 waterproof', 9999.00, 'JBL', 'Speakers', '2021-08-01', true, 100)
ON CONFLICT (product_id) DO NOTHING;