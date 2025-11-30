CREATE DATABASE  IF NOT EXISTS `challenge`;
USE `challenge`;

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT,
    `precio` DECIMAL(10,2) NOT NULL COMMENT 'Precio en Pesos Argentinos',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `products`
--
