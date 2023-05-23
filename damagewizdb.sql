-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: damagewizdb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `car`
--

USE damagewizdb;

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'Volkswagen','Golf'),(2,'Volkswagen','Beetle'),(3,'Ford','Fiesta'),(4,'Ford','Mustang'),(5,'Toyota','Corolla'),(6,'Toyota','Yaris'),(7,'Hyundai','Accent'),(8,'Hyundai','Elantra'),(9,'Audi','A3'),(10,'Audi','TT'),(11,'Honda','Accord'),(12,'Honda','Civic');
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_part_names`
--

DROP TABLE IF EXISTS `car_part_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_part_names` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_part_names`
--

LOCK TABLES `car_part_names` WRITE;
/*!40000 ALTER TABLE `car_part_names` DISABLE KEYS */;
INSERT INTO `car_part_names` VALUES (1,'Headlamp'),(2,'Rear Bumper'),(3,'Door'),(4,'Hood'),(5,'Front Bumper');
/*!40000 ALTER TABLE `car_part_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car_parts`
--

DROP TABLE IF EXISTS `car_parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car_parts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `labor_cost` int NOT NULL,
  `price` int NOT NULL,
  `car_id` bigint DEFAULT NULL,
  `mechanic_id` bigint DEFAULT NULL,
  `photo` varbinary(255) DEFAULT NULL,
  `car_part_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7it90x19sd947imtlpkdgwexg` (`car_id`),
  KEY `FK2snndvw68wf9vuucrk89kl19w` (`mechanic_id`),
  KEY `FKrkyn5r72g7jlyupiih06uwyx0` (`car_part_id`),
  CONSTRAINT `FK2snndvw68wf9vuucrk89kl19w` FOREIGN KEY (`mechanic_id`) REFERENCES `mechanics` (`id`),
  CONSTRAINT `FK7it90x19sd947imtlpkdgwexg` FOREIGN KEY (`car_id`) REFERENCES `car` (`id`),
  CONSTRAINT `FKrkyn5r72g7jlyupiih06uwyx0` FOREIGN KEY (`car_part_id`) REFERENCES `car_part_names` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car_parts`
--

LOCK TABLES `car_parts` WRITE;
/*!40000 ALTER TABLE `car_parts` DISABLE KEYS */;
INSERT INTO `car_parts` VALUES (12,100,350,1,1,NULL,1),(13,100,250,1,1,NULL,1),(14,100,250,3,2,NULL,4),(15,100,300,5,2,NULL,3),(16,150,350,5,1,NULL,3),(17,100,200,5,1,NULL,1),(18,250,450,5,2,NULL,2),(19,300,100,3,1,NULL,4),(20,150,250,3,2,NULL,5),(21,100,200,3,1,NULL,3);
/*!40000 ALTER TABLE `car_parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanics`
--

DROP TABLE IF EXISTS `mechanics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanics` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `latitude` varchar(255) NOT NULL,
  `longitude` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanics`
--

LOCK TABLES `mechanics` WRITE;
/*!40000 ALTER TABLE `mechanics` DISABLE KEYS */;
INSERT INTO `mechanics` VALUES (1,'Put Request\'in Yeri','41.07965151437728','28.972239969817185','5349992255'),(2,'Mehmet\'in Yeri','41.04067710684147','29.18053212711938','5324448877'),(3,'Tamirhaneler Kralı','40.90011985213997','29.18844974829149','5369991100'),(4,'Gecekonduların Tamircisi V2','41.14941253807835','29.0443914140428','5396569874');
/*!40000 ALTER TABLE `mechanics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_orders`
--

DROP TABLE IF EXISTS `my_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `car_part` bigint DEFAULT NULL,
  `user` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKm7edayagclxubxjhm8352inu1` (`car_part`),
  KEY `FK4vxfxed0qw6qqnn0736goxkcy` (`user`),
  CONSTRAINT `FK4vxfxed0qw6qqnn0736goxkcy` FOREIGN KEY (`user`) REFERENCES `users` (`id`),
  CONSTRAINT `FKm7edayagclxubxjhm8352inu1` FOREIGN KEY (`car_part`) REFERENCES `car_parts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_orders`
--

LOCK TABLES `my_orders` WRITE;
/*!40000 ALTER TABLE `my_orders` DISABLE KEYS */;
INSERT INTO `my_orders` VALUES (21,1,12,1),(22,1,13,1),(23,2,12,1),(24,2,13,1);
/*!40000 ALTER TABLE `my_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_r53o2ojjw4fikudfnsuuga336` (`password`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'yhsenyurt@gmail.com','Hasan','Senyurt','$2a$10$7mdHFM.gE35R6Dspvr574OMBieWtkd7WdfiOvdgfdCikaBw2SlRGC','USER','5551113322'),(2,'admin','admin','admin','$2a$10$qd4j2DlsZrVHSy1v.cwQb.TPoEsjCCy0aleidKjjjhLK7.gBK.os6','ADMIN','0000000000'),(4,'cem@gmail.com','Cem','Anaral','$2a$10$J8HeqcNRgmBCKQTFZLkwPOLHr/eR7JegZ1j4KRtnDGIbClGudUnzK','USER','5368887766'),(5,'yusuf@gmail.com','Yusuf','Senyurt','$2a$10$XRgfHt.5Ari2jBbWxGCqAObAC6nrIE1cAqdoohhOX9TxJKN0y9ZXy','USER',NULL),(6,'melisa@gmail.com','Melisa','Durmus','$2a$10$/q6uEsbKxcHju2kRD0DVdOSCTKZcAoftovbBWbc.Nq6PwVnZsqNTq','USER',NULL),(7,'ali@gmail.com','Ali','Yetim','$2a$10$h6ybPeVXLe1DkY9SqpJjDevJvy//dMFk3BMeA/iDU5qdFfjtgDPMe','USER',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23  3:01:04
