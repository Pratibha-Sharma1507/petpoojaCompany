-- MariaDB dump 10.19  Distrib 10.4.28-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: petpoojadb
-- ------------------------------------------------------
-- Server version	10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (' CS','CSE','active','2025-02-07 13:21:36','2025-02-07 13:21:36'),(' d7','Admin','active','2025-02-07 08:24:26','2025-02-07 08:24:26'),('d1','HR','active','2025-02-05 10:57:05','2025-02-05 10:57:05'),('d2','IT','active','2025-02-05 10:57:05','2025-02-05 10:57:05'),('d3','Finance','active','2025-02-05 10:57:05','2025-02-05 10:57:05'),('d4','Marketing','active','2025-02-05 10:57:05','2025-02-05 10:57:05'),('d5','developer','active','2025-02-06 07:07:12','2025-02-06 07:07:12'),('d6','account','active','2025-02-06 07:16:20','2025-02-06 07:16:20'),('d9','ME','active','2025-02-08 09:46:56','2025-02-08 09:46:56');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `id` varchar(50) NOT NULL,
  `department_id` varchar(50) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  `dob` date NOT NULL,
  `phone` char(10) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created` timestamp NOT NULL DEFAULT current_timestamp(),
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES ('e1','d2','Pratibha sharma','2002-07-10','9993606812','photo-1739027733651.image1.png','sharma14@gmail.com',90000.00,'active','2025-02-08 10:45:09','2025-02-08 15:15:33'),('e15',' d7','psp','1992-12-10','1234509875','photo-1739025563386.images1.jpg','ppp@gmail.com',90000.00,'active','2025-02-08 14:39:23','2025-02-08 14:39:23'),('e16','d5','Anji','2000-01-01','1112223334','photo-1739027608913.image1.png','aa@gmail.com',30000.00,'active','2025-02-08 15:13:28','2025-02-08 15:13:28'),('e2','d1','Deepika Sharma','1998-10-10','1234512348','photo-1739022449708.image1.png','deepika@gmail.com',700000.00,'inactive','2025-02-08 13:47:29','2025-02-08 13:47:29'),('e4','d5','Anajli Sharma','2000-01-01','1122334458','photo-1739022712090.image1.png','anjali@gmail.com',80000.00,'active','2025-02-08 13:51:52','2025-02-08 13:51:52'),('e5',' d7','Ankita','1997-01-01','1234554321','photo-1739022808683.image1.png','ankita@gmail.com',5000.00,'active','2025-02-08 13:53:28','2025-02-08 13:53:28'),('e8','d9','PS','1999-01-01','1234554322','photo-1739023090461.images1.jpg','ps@gmail.com',8000.00,'active','2025-02-08 13:58:10','2025-02-08 13:58:10');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-08 21:23:34
