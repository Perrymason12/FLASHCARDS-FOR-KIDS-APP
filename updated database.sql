-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: flashcards_db
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `flashcards`
--

DROP TABLE IF EXISTS `flashcards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashcards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `front` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `back` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `flashcards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashcards`
--

LOCK TABLES `flashcards` WRITE;
/*!40000 ALTER TABLE `flashcards` DISABLE KEYS */;
INSERT INTO `flashcards` VALUES (1,2,'Q: What is half of 18?','A: 9','Math','2025-08-31 17:54:47'),(2,2,'Q: A pencil costs 7 shillings. How much do 5 pencils cost?','(Answer): 35 shillings','Math','2025-08-31 17:57:46'),(3,2,'Q: 20 + 5 = ?','A:25','Math','2025-08-31 18:00:51'),(4,4,'Q: What is half of 18?','A: 9','Math','2025-09-02 07:43:20'),(5,4,'Q: A pencil costs 7 shillings. How much do 5 pencils cost','A: 35 shillings','Math','2025-09-02 07:46:49'),(6,4,'Q: 6 × 7 = ?','A: 42','Math','2025-09-02 08:02:48'),(7,4,'Q: 20 ÷ 5 = ?','A: 4','Math','2025-09-02 08:08:48'),(8,4,'Q1: Who was the first President of the United States?','A1: George Washington','History','2025-09-02 08:11:00'),(9,4,'Q3: Which empire built the Colosseum?','A3: The Roman Empire','History','2025-09-02 08:12:39'),(10,4,'Q4: Who was known as the \"Maid of Orléans\"?','A4: Joan of Arc','History','2025-09-02 08:20:33'),(11,4,'Q5: The Great Wall is located in which country?','A5: China','History','2025-09-02 08:21:18'),(12,4,'Q1: What is the chemical symbol for Gold?','A1: Au','Chemistry','2025-09-02 08:23:37'),(13,4,'Q2: What is the pH value of pure water at 25°C?','A2: 7 (neutral)','Chemistry','2025-09-02 08:29:07'),(14,4,'Q3: Who is considered the father of the periodic table?','A3: Dmitri Mendeleev','Chemisrty','2025-09-02 08:30:33'),(15,4,'Q4: What gas is produced when zinc reacts with hydrochloric acid?','A4: Hydrogen gas (H₂)','Chemistry','2025-09-02 08:32:15'),(16,4,'Q5: Which element is the most abundant in the Earth’s atmosphere?','A5: Nitrogen (N₂)','Chemistry','2025-09-02 08:37:31');
/*!40000 ALTER TABLE `flashcards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'munguditperry@gmail.com',
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'PERRYMASON','munguditperry@gmail.com','perrymason1','2025-08-31 17:24:19'),(2,'Perry Mungudit','2501600007@sun.ac.ug','12345678','2025-08-31 17:44:50'),(3,'mason','perry@gmail.com','$2b$12$ViPFC6ScW.94a6g4g/Jg3OajlOQjcEobFUVpBbZMB3WOPITqJ1HBK','2025-09-01 13:00:01'),(4,'magie','magie@gmail.com','$2b$12$6eZ2P1T5O8pBSLhj7VMW3OJW2Kj2UC518/LOCTSD9UzuieDgACj7i','2025-09-02 07:37:27');
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

-- Dump completed on 2025-09-02 13:52:25
