CREATE DATABASE  IF NOT EXISTS `production_blog_post` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `production_blog_post`;
-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: production_blog_post
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postTitle` varchar(200) DEFAULT NULL,
  `createdBy` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'News',1,'2021-11-26 13:03:05','Tamil Nadu Govt to release 700 life convicts to mark 113th birth anniversary of former CM and DMK founder Aringnar CN Annadurai'),(2,'News',1,'2021-11-26 13:03:39','All States and UTs to conduct rigorous testing of travellers coming from countries where new COVID-19 variant is reported'),(3,'crim news',1,'2021-11-26 13:04:00','Ex-cop Samsher Khan Pathan claims Param Bir Singh destroyed mobile phone seized from 26/11 terror attack convict'),(4,'earth quakes',1,'2021-11-26 13:04:34','Massive earthquake of magnitude 6.1 jolted India-Myanmar border region on early Friday, tremors felt at 175 km E of Chittagong'),(5,'earth quakes',1,'2021-11-26 13:04:55','Massive earthquake of magnitude 6.1 jolted India-Myanmar border region on early Friday, tremors felt at 175 km E of Chittagong'),(6,'government update',1,'2021-11-26 13:05:30','Central govt takes considered decision to revisit the annual income fixed for determining EWS for reservation in NEET admissions'),(7,'government update new',1,'2021-11-26 13:08:33','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(9,'government update',1,'2021-11-26 13:37:31','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(10,'government update',1,'2021-11-26 13:38:05','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(12,'government update',1,'2021-11-26 13:41:52','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(13,'government update',1,'2021-11-26 13:42:21','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(14,'government update',1,'2021-11-26 13:42:29','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(15,'government update',1,'2021-11-26 13:42:42','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(16,'government update',1,'2021-11-26 13:42:49','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(17,'government update',1,'2021-11-26 13:42:55','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(18,'government update',1,'2021-11-26 13:43:03','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(19,'government update',1,'2021-11-26 13:43:13','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(20,'government update',1,'2021-11-26 13:43:20','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(21,'government update',1,'2021-11-26 13:43:31','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(22,'government update',1,'2021-11-26 13:43:37','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(23,'government update',1,'2021-11-26 13:43:43','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(24,'government update',1,'2021-11-26 13:43:52','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(25,'government update',1,'2021-11-26 13:44:02','Episode for Smriti Irani to promote her debut novel, \'Lal Salaam\' on The Kapil Sharma Show didn\'t happen due to misunderstanding'),(28,' test post  ',14,'2021-11-26 14:23:22',' test post decription');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `replies`
--

DROP TABLE IF EXISTS `replies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `replies` varchar(250) DEFAULT NULL,
  `repliedBy` int NOT NULL,
  `repliedOn` int NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `repliedBy` (`repliedBy`),
  KEY `repliedOn` (`repliedOn`),
  CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`repliedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`repliedOn`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `replies`
--

LOCK TABLES `replies` WRITE;
/*!40000 ALTER TABLE `replies` DISABLE KEYS */;
INSERT INTO `replies` VALUES (3,'ssss scnd  update reply',1,1,'2021-11-26 13:58:05'),(4,'ssss scnd  update reply',1,1,'2021-11-26 13:58:06'),(5,'ssss scnd  update reply',1,1,'2021-11-26 13:58:06'),(6,'ssss scnd  update reply',1,1,'2021-11-26 13:58:07'),(7,'ssss scnd  update reply',1,1,'2021-11-26 13:58:08'),(8,'ssss scnd  update reply',1,1,'2021-11-26 13:59:43'),(9,'ssss scnd  update reply',1,1,'2021-11-26 14:00:07'),(10,'ssss scnd  update reply',1,1,'2021-11-26 14:00:15'),(11,'ssss scnd  update reply',1,1,'2021-11-26 14:00:23'),(12,'ssss scnd  update reply',1,1,'2021-11-26 14:00:26'),(13,'ssss scnd  update reply',1,1,'2021-11-26 14:00:27'),(14,'ssss scnd  update reply',1,1,'2021-11-26 14:00:35'),(15,'ssss scnd  update reply',1,1,'2021-11-26 14:00:36'),(16,'ssss scnd  update reply',1,1,'2021-11-26 14:01:38'),(17,'ssss scnd  update reply',1,1,'2021-11-26 14:01:39'),(18,'ssss scnd  update reply',1,1,'2021-11-26 14:01:40'),(19,'ssss scnd  update reply',1,1,'2021-11-26 14:02:32');
/*!40000 ALTER TABLE `replies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` tinyint(1) DEFAULT '0' COMMENT '0 -normal user 1-admin',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'testuser','updatedtestusertest123@gmail.com','$2b$10$us8HbjJSIzVr.VxD7tR9NuLJ6HnSZVRpb4QzV/Rus1JUxl1FBcUiK',1),(7,'newtestuser','test123@gmail.com','$2b$10$.jyl.2CyjYc8jTDkEHumr.ADlhNxwfKIsicJLHzXqTofbVecVQtyy',0),(8,'devusers','dev123@gmail.com','$2b$10$n1aBhtEj7wfxdcn7fnD3GeJxuHFe8sryH/GxMEdeurdY/ZNMZnXSG',0),(13,'devusersnew','devusersnew@gmail.com','$2b$10$9PQGCZXBeetAcOdh6mb5kOcmizK3moHmjxsJYtDcKosjBQbvQuQJS',0),(14,'newuser3','newuser3@gmail.com','$2b$10$iBseCgAvSxxHyVm4Xb5Lo.pmeAjpDUNjHsTe8RzyXUzYQ1nkLwRv6',0);
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

-- Dump completed on 2021-11-26 14:41:14
