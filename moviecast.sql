-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 26, 2025 at 08:12 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviecast`
--

-- --------------------------------------------------------

--
-- Table structure for table `castfileupload`
--

CREATE TABLE `castfileupload` (
  `cfid` int(11) NOT NULL,
  `crid` int(11) DEFAULT NULL,
  `fileupload` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT 'pending',
  `description` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `castfileupload`
--

INSERT INTO `castfileupload` (`cfid`, `crid`, `fileupload`, `status`, `description`, `userid`) VALUES
(1, 1, 'Screenshot_10.png', 'pending', 'dfsdafdasf', 3),
(2, 1, 'WIN_20241209_23_31_09_Pro.mp4', 'approve', 'hi this is hari', 5);

-- --------------------------------------------------------

--
-- Table structure for table `castformovie`
--

CREATE TABLE `castformovie` (
  `cmid` int(11) NOT NULL,
  `moviename` varchar(100) DEFAULT NULL,
  `movieimage` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `movieplanned` date DEFAULT NULL,
  `moviereleased` date DEFAULT NULL,
  `postdate` datetime DEFAULT current_timestamp(),
  `status` varchar(100) DEFAULT NULL,
  `userid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `castformovie`
--

INSERT INTO `castformovie` (`cmid`, `moviename`, `movieimage`, `description`, `movieplanned`, `moviereleased`, `postdate`, `status`, `userid`) VALUES
(1, 'beast', 'WhatsApp_Image_2024-12-03_at_21.47.43_9de5c763.jpg', 'aasdgsdf', '2024-12-06', '2025-02-21', '2024-12-03 21:53:07', 'planned', 1),
(2, 'sdjfkljl', 'Screenshot_13.png', 'this is movie related to jokes', '0000-00-00', '0000-00-00', '2024-12-05 16:55:56', 'planned', 1);

-- --------------------------------------------------------

--
-- Table structure for table `castrequired`
--

CREATE TABLE `castrequired` (
  `crid` int(11) NOT NULL,
  `castname` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `totalnoofuser` varchar(100) DEFAULT NULL,
  `cmid` int(11) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `castrequired`
--

INSERT INTO `castrequired` (`crid`, `castname`, `role`, `totalnoofuser`, `cmid`, `status`) VALUES
(1, 'actor', 'actor', '3', 1, 'available'),
(2, 'actress', 'actress', '-2', 1, 'available'),
(3, 'actor', 'well performed', '2', 2, 'available');

-- --------------------------------------------------------

--
-- Table structure for table `chatwithuser`
--

CREATE TABLE `chatwithuser` (
  `cuid` int(11) NOT NULL,
  `fromuser` int(11) DEFAULT NULL,
  `touser` int(11) DEFAULT NULL,
  `chat` text DEFAULT NULL,
  `messagedate` datetime DEFAULT current_timestamp(),
  `readed` varchar(100) NOT NULL DEFAULT 'unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `chatwithuser`
--

INSERT INTO `chatwithuser` (`cuid`, `fromuser`, `touser`, `chat`, `messagedate`, `readed`) VALUES
(1, 2, 1, 'hi', '2024-11-20 16:52:12', 'readed'),
(2, 2, 1, 'hello', '2024-11-20 17:00:01', 'readed'),
(3, 2, 1, 'hey', '2024-11-20 17:00:40', 'readed'),
(4, 1, 2, 'yes', '2024-11-20 17:01:35', 'readed'),
(5, 2, 1, 'k how r you', '2024-11-20 17:06:30', 'readed'),
(6, 2, 1, 'welcome back', '2024-11-20 17:06:39', 'readed'),
(7, 1, 2, 'im good !!', '2024-11-20 17:07:06', 'readed'),
(8, 1, 2, 'how about you', '2024-11-20 17:07:17', 'readed'),
(9, 1, 2, 'ok things going fine', '2024-11-20 17:08:23', 'readed'),
(10, 2, 1, 'k thanks', '2024-11-21 10:59:00', 'readed'),
(11, 1, 3, 'hello', '2024-12-05 17:37:43', 'readed'),
(12, 1, 3, 'hi this is hari', '2024-12-05 17:45:55', 'readed'),
(13, 2, 3, 'how r u ', '2024-12-05 17:46:08', 'readed'),
(14, 3, 2, 'k', '2024-12-05 17:46:34', 'readed'),
(15, 3, 1, 'it fine', '2024-12-05 17:46:43', 'readed');

-- --------------------------------------------------------

--
-- Table structure for table `liveaudition`
--

CREATE TABLE `liveaudition` (
  `lid` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `crid` int(11) DEFAULT NULL,
  `starttime` datetime DEFAULT NULL,
  `enddate` datetime DEFAULT NULL,
  `status` varchar(100) DEFAULT 'booked',
  `address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `liveaudition`
--

INSERT INTO `liveaudition` (`lid`, `userid`, `crid`, `starttime`, `enddate`, `status`, `address`) VALUES
(1, 3, 1, '2024-12-09 23:07:00', '2024-12-09 02:07:00', 'Accepted', 'pondicherry'),
(2, 5, 1, '2024-12-03 21:46:00', '2024-12-10 13:46:00', 'Accepted', 'pondy'),
(3, 3, 1, '2024-12-03 22:13:00', '2024-12-10 22:13:00', 'booked', 'sdfasd'),
(4, 3, 1, '2024-12-03 22:13:00', '2024-12-10 22:13:00', 'booked', 'sdfasd');

-- --------------------------------------------------------

--
-- Table structure for table `usersdetails`
--

CREATE TABLE `usersdetails` (
  `uid` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `approved` int(11) DEFAULT 0,
  `profilepic` varchar(100) DEFAULT NULL,
  `videoname` varchar(100) DEFAULT NULL,
  `password` varchar(1000) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usersdetails`
--

INSERT INTO `usersdetails` (`uid`, `name`, `mobile`, `email`, `role`, `approved`, `profilepic`, `videoname`, `password`, `description`) VALUES
(1, 'hari', '9952363956', 'hariharanvimal@gmail.com', 'Director', 1, 'one.png', 'WIN_20241102_11_43_52_Pro.mp4', '1212', ''),
(2, 'admin', '9952363956', 'admin@gmail.com', 'admin', 1, NULL, NULL, '1212', ''),
(3, 'ganesh', '45456146465', 'hariharanrniit@gmail.com', 'Actor', 1, 'Screenshot_11.png', 'WIN_20241102_11_43_52_Pro.mp4', '1212', ''),
(4, 'fdlak', '', 'jar;ak@gmail.com', 'Director', 0, '', '', '1212', ''),
(5, 'one', '9952363656', 'one@gmail.com', 'Actress', 1, 'WIN_20241209_23_31_18_Pro.jpg', 'WIN_20241102_12_30_35_Pro.mp4', '1212', ''),
(6, 'hariharan', '9952363956', 'hari@gmail.com', 'Director', 1, 'Screenshot_13.png', 'WhatsApp_Image_2024-12-03_at_21.47.43_9de5c763.jpg', '1212', 'i am a good emotion actor.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `castfileupload`
--
ALTER TABLE `castfileupload`
  ADD PRIMARY KEY (`cfid`),
  ADD KEY `crid` (`crid`);

--
-- Indexes for table `castformovie`
--
ALTER TABLE `castformovie`
  ADD PRIMARY KEY (`cmid`);

--
-- Indexes for table `castrequired`
--
ALTER TABLE `castrequired`
  ADD PRIMARY KEY (`crid`),
  ADD KEY `cmid` (`cmid`);

--
-- Indexes for table `chatwithuser`
--
ALTER TABLE `chatwithuser`
  ADD PRIMARY KEY (`cuid`);

--
-- Indexes for table `liveaudition`
--
ALTER TABLE `liveaudition`
  ADD PRIMARY KEY (`lid`),
  ADD KEY `userid` (`userid`),
  ADD KEY `crid` (`crid`);

--
-- Indexes for table `usersdetails`
--
ALTER TABLE `usersdetails`
  ADD PRIMARY KEY (`uid`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `castfileupload`
--
ALTER TABLE `castfileupload`
  ADD CONSTRAINT `castfileupload_ibfk_1` FOREIGN KEY (`crid`) REFERENCES `castrequired` (`crid`) ON DELETE CASCADE;

--
-- Constraints for table `castrequired`
--
ALTER TABLE `castrequired`
  ADD CONSTRAINT `castrequired_ibfk_1` FOREIGN KEY (`cmid`) REFERENCES `castformovie` (`cmid`) ON DELETE CASCADE;

--
-- Constraints for table `liveaudition`
--
ALTER TABLE `liveaudition`
  ADD CONSTRAINT `liveaudition_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `usersdetails` (`uid`),
  ADD CONSTRAINT `liveaudition_ibfk_2` FOREIGN KEY (`crid`) REFERENCES `castrequired` (`crid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
