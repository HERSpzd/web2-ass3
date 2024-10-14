-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: crowdfunding_db
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CATEGORY_ID` int NOT NULL AUTO_INCREMENT,
  `NAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Emergency'),(2,'Business'),(3,'Medical'),(4,'Education'),(5,'Sports'),(6,'Travel'),(7,'Environment'),(8,'Volunteer');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `DONATION_ID` int NOT NULL AUTO_INCREMENT,
  `DATE` date DEFAULT NULL,
  `AMOUNT` decimal(15,2) DEFAULT NULL,
  `GIVER` varchar(50) DEFAULT NULL,
  `FUNDRAISER_ID` int DEFAULT NULL,
  PRIMARY KEY (`DONATION_ID`),
  KEY `FUNDRAISER_ID` (`FUNDRAISER_ID`),
  CONSTRAINT `donation_ibfk_1` FOREIGN KEY (`FUNDRAISER_ID`) REFERENCES `fundraiser` (`FUNDRAISER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES (1,'2024-01-02',100.00,'Hayes',1),(2,'2024-01-05',200.00,'Zhang',2),(3,'2024-02-10',350.00,'Wang',3),(4,'2024-06-10',600.00,'Kyler',4),(5,'2024-06-15',50.00,'Diana',5),(6,'2024-06-16',5.00,'Li',5),(7,'2024-06-22',5.00,'Bubles',5),(8,'2024-06-22',5.00,'Mya',4),(9,'2024-10-05',5.00,'qwe',1),(10,'2024-10-05',5.00,'ASD',1),(18,'2024-10-05',5.00,'q1',1),(19,'2024-10-05',1.00,'zx',1),(20,'2024-10-05',5.00,'a1',1),(21,'2024-10-05',5.00,'a1',1);
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `FUNDRAISER_ID` int NOT NULL AUTO_INCREMENT,
  `ORGANIZER` varchar(50) DEFAULT NULL,
  `CAPTION` varchar(100) DEFAULT NULL,
  `TARGET_FUNDING` decimal(15,2) DEFAULT NULL,
  `CURRENT_FUNDING` decimal(15,2) DEFAULT NULL,
  `CITY` varchar(50) DEFAULT NULL,
  `ACTIVE` tinyint(1) DEFAULT NULL,
  `CATEGORY_ID` int DEFAULT NULL,
  PRIMARY KEY (`FUNDRAISER_ID`),
  KEY `CATEGORY_ID` (`CATEGORY_ID`),
  CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES `fundraiser` WRITE;
/*!40000 ALTER TABLE `fundraiser` DISABLE KEYS */;
INSERT INTO `fundraiser` VALUES (1,'Lauren','Fire emergency rescue',5000.00,2560.34,'London',1,1),(2,'Matthew','Emergency rescue for drought',10000.00,3671.56,'Beijing',1,1),(3,'Ashley','Enterprise expansion',100000.00,32560.66,'Guangzhou',1,2),(4,'Andrew','Enterprise innovation',200000.00,23460.55,'Liuzhou',1,2),(5,'Olivia','Reduce diseases',12000.00,25672.23,'Nairobi',1,3),(6,'Mason','Donate to children education',10000.00,2532.23,'London',1,4),(7,'Luna','Donating young people to attend university',10000.00,3624.76,'Nairobi',0,4),(8,'Sofia','Build a sports stadium for the countryside',10000.00,3253.66,'Guangzhou',1,5),(9,'Jack','Build a basketball court for the countryside',20000.00,13450.55,'Liuzhou',1,5),(10,'Madison','Donate a student trip',15000.00,5375.00,'Shenzhen',1,6),(11,'Aiden','Donate a trip for children',12000.00,5672.26,'Shanghai',1,6),(12,'Nora','Protecting the Forest Farm Environment',12000.00,25623.59,'Lima',1,7),(13,'Lincoln','Protecting the marine environment',12000.00,23672.23,'Cairo',1,7),(14,'Brooklyn','Volunteer activities to assist the elderly',15000.00,9773.23,'Berlin',1,8),(15,'Anna','Medical volunteer activities',16000.00,5672.23,'Cairo',1,8);
/*!40000 ALTER TABLE `fundraiser` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 21:22:16
