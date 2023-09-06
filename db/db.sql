-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 12, 2023 at 05:54 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` varchar(100) NOT NULL,
  `img` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `type`, `img`) VALUES
(1, 'กะเพราโคตรเด็ด by บ้านสวน - บางหว้า', 'ข้าว', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C251KE3UJRJHV2/hero/4874e509-6102-4365-a0a2-9fcb9ae84064__store_cover__2023__02__25__07__28__16.webp'),
(2, 'ขาหมูมนตรี - บางกรวย ไทรน้อย', 'ข้าว', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CZLHGPCYR3CJLA/hero/1d410a7e4cfc4c658cda2b5103a0b99a_1598936609087371387.webp'),
(3, 'ข้าวเหนียวมะม่วง (Kao Niew Ma Muang chef Ple) - GrabKitchen พระราม 9', 'ของหวาน', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C4CBJALXG7CTJ2/hero/7bd88ed2da344520b055e5fa463d001f_1684229633973140264.webp'),
(4, 'ไข่หวานบ้านซูชิ - ฟู้ดวิลล่า ราชพฤกษ์', 'ชูชิ', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2TVE2NBFCNAAX/hero/f3d8b187159849728e48eb2edc72b859_1635730021725058206.webp'),
(5, 'ก๋วยเตี๋ยวต้มยำไทยเฮง - ถนนบางศรีเมือง 1', 'ก๋วยเตี๋ยว', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2BBJEKGKEAGTX/hero/dc8a8066891640dbb8763da81bbcb04e_1602480094586992766.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
