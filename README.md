# Vithub

nodemon/node app.js
cd view
php -S 127.0.0.1:6100 




SQL


-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 07, 2021 at 12:28 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodelogin`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `username`, `password`, `email`) VALUES
(24, 'aniket', '$2b$10$IwB7XKhxtVDPtgEu5Jjg0eXpqwPjHg6X1X0XkLNzfu0sRvDu0jCOu', 'aniket@gmail.com'),
(28, 'mail', '$2b$10$foXAX4zQymmiTcxfqBsJU.ABz1iQzgFfxx.PSYt6cB41AjizjQoH6', 'mail@gmail.com'),
(23, 'sreekar', '$2b$10$ZZd01/QixwbSrvc1Q60PN.PSfzHJbhdDnJ.eiheoHW3UMD.PoVd.y', 'sreekar@gmail.com'),
(27, 'test', '$2b$10$.Qp3u38EgAAQNHNq22FnHODpNn21FnBuc.IVCC8uxLnbM39C.90V2', 'test@gmail.com'),
(26, 'ujjawal', '$2b$10$U6r6dZjaSvQEummhQQHOM.x1P3t1SfJmW7BpTvaEok.PeZu2uP.XW', 'ujjawal@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_files`
--

CREATE TABLE `tbl_files` (
  `id` int(9) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `created` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_files`
--

INSERT INTO `tbl_files` (`id`, `filename`, `created`) VALUES
(13, '1-c.pptx', '2021-11-07 11:08:46'),
(12, '1-id.jpeg', '2021-11-07 11:07:47'),
(10, '1-a.pdf', '2021-11-07 11:07:25'),
(11, '1-b.pdf', '2021-11-07 11:07:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`email`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tbl_files`
--
ALTER TABLE `tbl_files`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tbl_files`
--
ALTER TABLE `tbl_files`
  MODIFY `id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
