-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: caronapp_bd
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `activations`
--

DROP TABLE IF EXISTS `activations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` int NOT NULL,
  `users_id` int NOT NULL,
  `expire_at` datetime NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`users_id`),
  CONSTRAINT `fk_activations_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activations`
--

LOCK TABLES `activations` WRITE;
/*!40000 ALTER TABLE `activations` DISABLE KEYS */;
/*!40000 ALTER TABLE `activations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blocks`
--

DROP TABLE IF EXISTS `blocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reason` varchar(95) DEFAULT NULL,
  `ban_date` datetime DEFAULT NULL,
  `email` varchar(65) DEFAULT NULL,
  `id_user` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blocks`
--

LOCK TABLES `blocks` WRITE;
/*!40000 ALTER TABLE `blocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `blocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `change_password`
--

DROP TABLE IF EXISTS `change_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `change_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(56) NOT NULL,
  `id_user` int unsigned NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `change_password`
--

LOCK TABLES `change_password` WRITE;
/*!40000 ALTER TABLE `change_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `change_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confirmed_users`
--

DROP TABLE IF EXISTS `confirmed_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confirmed_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `id_route_point` int NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `id_ride` int NOT NULL,
  `id_user` int NOT NULL,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_ride_idx` (`id_ride`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `fk_pendent_users_rides10` FOREIGN KEY (`id_ride`) REFERENCES `rides` (`id`),
  CONSTRAINT `fk_pendent_users_users10` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confirmed_users`
--

LOCK TABLES `confirmed_users` WRITE;
/*!40000 ALTER TABLE `confirmed_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `confirmed_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destinations`
--

DROP TABLE IF EXISTS `destinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `picture` longtext,
  `reference` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `picture_small` longtext,
  `pointscol` varchar(45) DEFAULT NULL,
  `id_region` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_region-destination_idx` (`id_region`),
  CONSTRAINT `fk_points_regions10` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destinations`
--

LOCK TABLES `destinations` WRITE;
/*!40000 ALTER TABLE `destinations` DISABLE KEYS */;
INSERT INTO `destinations` VALUES (1,'UNIFEI',0,0,'https://unifei.edu.br/instituto-ciencias-tecnologicas/wp-content/uploads/sites/110/2019/08/Unifei_Predio2-1024x498.jpg',NULL,'1',1,'https://unifei.edu.br/instituto-ciencias-tecnologicas/wp-content/uploads/sites/110/2019/08/Unifei_Predio2-1024x498.jpg',NULL,1);
/*!40000 ALTER TABLE `destinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(80) DEFAULT NULL,
  `feedback` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logs`
--

DROP TABLE IF EXISTS `logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `log` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logs`
--

LOCK TABLES `logs` WRITE;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(96) NOT NULL,
  `created_at` datetime NOT NULL,
  `id_ride` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_ride_idx` (`id_ride`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `fk_messages_rides1` FOREIGN KEY (`id_ride`) REFERENCES `rides` (`id`),
  CONSTRAINT `fk_messages_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pendent_users`
--

DROP TABLE IF EXISTS `pendent_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pendent_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `id_route_point` int NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `id_ride` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_pendent_users_rides1_idx` (`id_ride`),
  KEY `fk_pendent_users_users1_idx` (`id_user`),
  CONSTRAINT `fk_pendent_users_rides1` FOREIGN KEY (`id_ride`) REFERENCES `rides` (`id`),
  CONSTRAINT `fk_pendent_users_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pendent_users`
--

LOCK TABLES `pendent_users` WRITE;
/*!40000 ALTER TABLE `pendent_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `pendent_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placeholder_copy1`
--

DROP TABLE IF EXISTS `placeholder_copy1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `placeholder_copy1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placeholder_copy1`
--

LOCK TABLES `placeholder_copy1` WRITE;
/*!40000 ALTER TABLE `placeholder_copy1` DISABLE KEYS */;
/*!40000 ALTER TABLE `placeholder_copy1` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `points`
--

DROP TABLE IF EXISTS `points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `points` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lat` double DEFAULT NULL,
  `long` double DEFAULT NULL,
  `picture` longtext,
  `reference` varchar(45) DEFAULT NULL,
  `region` varchar(45) DEFAULT NULL,
  `isActive` tinyint DEFAULT NULL,
  `picture_small` longtext,
  `pointscol` varchar(45) DEFAULT NULL,
  `id_region` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_points_regions1_idx` (`id_region`),
  CONSTRAINT `fk_points_regions1` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `points`
--

LOCK TABLES `points` WRITE;
/*!40000 ALTER TABLE `points` DISABLE KEYS */;
INSERT INTO `points` VALUES (1,'Posto Shell',0,0,'https://fastly.4sqi.net/img/general/600x600/38158448_3X2FKVcCwBnwgTlcSQRF65W_0zwJffkRPaedxp3_0Qg.jpg',NULL,'Amazonas',1,'https://fastly.4sqi.net/img/general/100x100/38158448_3X2FKVcCwBnwgTlcSQRF65W_0zwJffkRPaedxp3_0Qg.jpg',NULL,1),(2,'Yamaha',0,0,'https://www.milmotos.com.br/wp-content/uploads/2020/03/milmotos-valadares.jpg',NULL,'Centro',1,'https://www.milmotos.com.br/wp-content/uploads/2020/03/milmotos-valadares.jpg',NULL,1),(3,'Varanda',0,0,'data:image/jpeg;base64,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',NULL,'Centro',1,'data:image/jpeg;base64,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',NULL,1);
/*!40000 ALTER TABLE `points` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `users_id` int NOT NULL,
  `points_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`users_id`),
  KEY `id_point-preferences_idx` (`points_id`),
  CONSTRAINT `fk_preferences_points1` FOREIGN KEY (`points_id`) REFERENCES `points` (`id`),
  CONSTRAINT `fk_preferences_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provinces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `acronym` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces`
--

LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES (1,'Minas Gerais','MG');
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating_badges`
--

DROP TABLE IF EXISTS `rating_badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating_badges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_rating` int NOT NULL,
  `id_badge` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_badge_idx` (`id_badge`),
  KEY `id_rating_idx` (`id_rating`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating_badges`
--

LOCK TABLES `rating_badges` WRITE;
/*!40000 ALTER TABLE `rating_badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating_badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rating` int NOT NULL,
  `review` varchar(120) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `id_confirmed_user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_confirmed_user_idx` (`id_confirmed_user`),
  CONSTRAINT `fk_ratings_confirmed_users1` FOREIGN KEY (`id_confirmed_user`) REFERENCES `confirmed_users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `image` varchar(155) DEFAULT NULL,
  `keywords` varchar(100) DEFAULT NULL,
  `times` json DEFAULT NULL,
  `id_province` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `region-province` (`id_province`),
  CONSTRAINT `fk_regionsXXX_provinces1` FOREIGN KEY (`id_province`) REFERENCES `provinces` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Itabira','Regiao de Itabira','https://www.novaconcursos.com.br/portal/wp-content/uploads/2019/10/nova-itabira-mg-1-e1571765992515.jpg',NULL,'{\"times\": [\"13:00\"]}',1);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides`
--

DROP TABLE IF EXISTS `rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rides` (
  `id` int NOT NULL AUTO_INCREMENT,
  `outgoing` tinyint DEFAULT NULL,
  `spots` int NOT NULL,
  `time` datetime NOT NULL,
  `type` varchar(12) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `route` json NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `id_region` int NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_region_idx` (`id_region`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `fk_rides_regions1` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`),
  CONSTRAINT `fk_rides_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides`
--

LOCK TABLES `rides` WRITE;
/*!40000 ALTER TABLE `rides` DISABLE KEYS */;
/*!40000 ALTER TABLE `rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(35) NOT NULL,
  `id_user` int NOT NULL,
  `id_destination` int NOT NULL,
  `id_region` int NOT NULL,
  `origin` json NOT NULL,
  `points` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`id_user`),
  KEY `id_destination_idx` (`id_destination`),
  KEY `id_region_idx` (`id_region`),
  CONSTRAINT `fk_routes_destinations1` FOREIGN KEY (`id_destination`) REFERENCES `destinations` (`id`),
  CONSTRAINT `fk_routes_regions1` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`),
  CONSTRAINT `fk_routes_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (1,'Test',1,1,1,'{\"id\": 0, \"lat\": 0, \"long\": 0, \"name\": \"Ponto Teste\", \"region\": \"Outro\", \"checked\": true, \"picture\": \"https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg\"}','[{\"id\": -9680, \"lat\": 0, \"long\": 0, \"name\": \"Aa\", \"region\": \"Outro\", \"checked\": true, \"picture\": \"https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg\"}, {\"id\": -8444, \"lat\": 0, \"long\": 0, \"name\": \"Aaaaa\", \"region\": \"Outro\", \"checked\": true, \"picture\": \"https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg\"}]');
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `fk_sessions_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsors`
--

DROP TABLE IF EXISTS `sponsors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sponsors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(120) DEFAULT NULL,
  `order` int DEFAULT NULL,
  `link` varchar(80) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `text` longtext,
  `id_region` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_region_idx` (`id_region`),
  CONSTRAINT `fk_sponsors_regions1` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsors`
--

LOCK TABLES `sponsors` WRITE;
/*!40000 ALTER TABLE `sponsors` DISABLE KEYS */;
INSERT INTO `sponsors` VALUES (1,'https://i.imgur.com/35NPIxc.jpg',NULL,'www.google.com','Intro','Text test',NULL),(3,'https://i.imgur.com/35NPIxc.jpg',1,NULL,'Test',NULL,1);
/*!40000 ALTER TABLE `sponsors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suggestions`
--

DROP TABLE IF EXISTS `suggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suggestions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(105) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suggestions`
--

LOCK TABLES `suggestions` WRITE;
/*!40000 ALTER TABLE `suggestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `suggestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(12) NOT NULL,
  `id_region` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_region_idx` (`id_region`),
  CONSTRAINT `fk_types_regions1` FOREIGN KEY (`id_region`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'Aula',1),(2,'Prova',1);
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `regions_id` int NOT NULL,
  `picture` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_region_idx` (`regions_id`),
  CONSTRAINT `fk_universities_regions1` FOREIGN KEY (`regions_id`) REFERENCES `regions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `full_name` varchar(45) NOT NULL,
  `facebook_id` varchar(45) DEFAULT NULL,
  `ride_as_driver` int DEFAULT NULL,
  `ride_as_user` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `car_brand` varchar(50) DEFAULT NULL,
  `car_model` varchar(45) DEFAULT NULL,
  `car_color` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `password` longtext NOT NULL,
  `activated` tinyint DEFAULT NULL,
  `course` varchar(10) DEFAULT NULL,
  `course_ingression` varchar(6) DEFAULT NULL,
  `show_number` tinyint DEFAULT NULL,
  `id_region` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Pedro','Pedro Knup','123',NULL,NULL,'2021-01-01 00:00:00',NULL,NULL,NULL,'phknup@gmail.com',NULL,'https://i.pravatar.cc/150?img=12','123',1,NULL,NULL,NULL,NULL),(2,'Italo','Maciel','456',NULL,NULL,'2021-01-01 00:00:00',NULL,NULL,NULL,'phknup2@gmail.com',NULL,'https://i.pravatar.cc/150?img=13','123',1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warnings`
--

DROP TABLE IF EXISTS `warnings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warnings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `body` longtext NOT NULL,
  `button` varchar(45) DEFAULT NULL,
  `id_user` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `fk_warnings_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warnings`
--

LOCK TABLES `warnings` WRITE;
/*!40000 ALTER TABLE `warnings` DISABLE KEYS */;
/*!40000 ALTER TABLE `warnings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-04 13:36:34
