-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 03, 2024 at 03:13 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notiflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

DROP TABLE IF EXISTS `donors`;
CREATE TABLE IF NOT EXISTS `donors` (
  `DonorID` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `LastName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `DonorAddress` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `NationalIdentityNumber` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `PhoneNumber` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TempleID` int DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isApproved` int NOT NULL,
  PRIMARY KEY (`DonorID`),
  UNIQUE KEY `Email` (`Email`),
  KEY `TempleID` (`TempleID`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`DonorID`, `FirstName`, `LastName`, `Email`, `DonorAddress`, `NationalIdentityNumber`, `PhoneNumber`, `Password`, `TempleID`, `CreatedAt`, `isApproved`) VALUES
(73, 'Sachintha', 'Sando', 'akila@gmail.com', 'dfsfdvf', '200238589375', '94711304475', '', 20, '2024-05-01 20:41:47', 1),
(77, 'Gayan', 'Sachintha', 'gayansachintha1999@gmail.com', '12/2,Harumalgoda-west,Angulugaha', '199936453752', '94763616537', '', 20, '2024-05-01 21:29:50', 1),
(86, 'Binura', 'Thiranjaya', 'sanna@gmail.com', 'kjfdbskjdfb', '200036503752', '94763616537', '', 20, '2024-05-02 20:21:30', 2),
(87, 'sdf', 'Thiranjaya', 'gn@gmail.com', 'kjfdbskjdfb', '200036503752', '94763616537', '', 20, '2024-05-02 20:27:48', 2),
(88, 'Nirwan', 'Shakya', 'nirwwan@gmail.com', 'galle', '1998345467833', '94763616537', '$2b$08$1wPaEaNn.iNUn4qDfWRKbe5FZNXz0jb/TkyH4CxMUYBguQS69IxrW', 20, '2024-05-02 21:35:22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `donor_meals`
--

DROP TABLE IF EXISTS `donor_meals`;
CREATE TABLE IF NOT EXISTS `donor_meals` (
  `mealId` int NOT NULL AUTO_INCREMENT,
  `donorId` int NOT NULL,
  `mealType` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `mealDate` date NOT NULL,
  PRIMARY KEY (`mealId`),
  KEY `donorId` (`donorId`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donor_meals`
--

INSERT INTO `donor_meals` (`mealId`, `donorId`, `mealType`, `mealDate`) VALUES
(56, 88, 'morning', '2024-05-10'),
(57, 77, 'morning', '2024-05-12');

-- --------------------------------------------------------

--
-- Table structure for table `fileupload`
--

DROP TABLE IF EXISTS `fileupload`;
CREATE TABLE IF NOT EXISTS `fileupload` (
  `FileID` int NOT NULL AUTO_INCREMENT,
  `TempleID` int DEFAULT NULL,
  `FileName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`FileID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `geolocation`
--

DROP TABLE IF EXISTS `geolocation`;
CREATE TABLE IF NOT EXISTS `geolocation` (
  `GeoLocationID` int NOT NULL AUTO_INCREMENT,
  `TempleID` int DEFAULT NULL,
  `Latitude` decimal(10,8) NOT NULL,
  `Longitude` decimal(11,8) NOT NULL,
  PRIMARY KEY (`GeoLocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `monk`
--

DROP TABLE IF EXISTS `monk`;
CREATE TABLE IF NOT EXISTS `monk` (
  `MonkID` int NOT NULL AUTO_INCREMENT,
  `MonkName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `PhoneNumber` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `PasswordHash` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`MonkID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monk`
--

INSERT INTO `monk` (`MonkID`, `MonkName`, `Email`, `PhoneNumber`, `PasswordHash`) VALUES
(6, 'Sunananda Thero', 'sunananda@gmail.com', '94763616537', '$2b$08$bBTTG0CrpxQ7Z2W0/sFurOYls2Bvkavn215sAsf1DKqcAUTAeH1bO');

-- --------------------------------------------------------

--
-- Table structure for table `special_reservations`
--

DROP TABLE IF EXISTS `special_reservations`;
CREATE TABLE IF NOT EXISTS `special_reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `mealType` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `donorId` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `temple` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `special_reservations`
--

INSERT INTO `special_reservations` (`id`, `date`, `mealType`, `donorId`, `temple`) VALUES
(12, '2024-05-23', 'evening', '88', '20');

-- --------------------------------------------------------

--
-- Table structure for table `temple`
--

DROP TABLE IF EXISTS `temple`;
CREATE TABLE IF NOT EXISTS `temple` (
  `TempleID` int NOT NULL AUTO_INCREMENT,
  `templeMonk` varchar(222) COLLATE utf8mb4_general_ci NOT NULL,
  `TempleName` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `TempleAddress` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `PostalCode` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `RegistrationNo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `coordinates` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `images` mediumtext COLLATE utf8mb4_general_ci NOT NULL,
  `isApproved` int NOT NULL,
  PRIMARY KEY (`TempleID`),
  UNIQUE KEY `templeMonk` (`templeMonk`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `temple`
--

INSERT INTO `temple` (`TempleID`, `templeMonk`, `TempleName`, `TempleAddress`, `PostalCode`, `RegistrationNo`, `coordinates`, `images`, `isApproved`) VALUES
(20, 'sunananda@gmail.com', 'Keththarama ', 'St Road,Galle,Sri Lanka', '45354', 'BA2342345', '6.9270786,79.861243', 'test', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
