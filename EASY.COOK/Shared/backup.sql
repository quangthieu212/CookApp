-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.10.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for cook_solution
DROP DATABASE IF EXISTS `cook_solution`;
CREATE DATABASE IF NOT EXISTS `cook_solution` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cook_solution`;

-- Dumping structure for table cook_solution.role
DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(255) DEFAULT NULL,
  `is_menu` bit(1) DEFAULT NULL,
  `rol_icon` varchar(255) DEFAULT NULL,
  `rol_controller` varchar(255) DEFAULT NULL,
  `rol_order` int(11) DEFAULT NULL,
  `rol_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.role: ~0 rows (approximately)
DELETE FROM `role`;

-- Dumping structure for table cook_solution.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `user_pass` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_phone` varchar(12) DEFAULT NULL,
  `user_birth` datetime DEFAULT NULL,
  `user_gender` char(1) DEFAULT NULL COMMENT '0: Nữ 1: Nam 2: Khác',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `user_address` varchar(255) DEFAULT NULL,
  `user_email` varchar(100) DEFAULT NULL,
  `user_image` varchar(255) DEFAULT NULL,
  `user_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  `grp_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user: ~1 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `user_id`, `user_pass`, `user_name`, `user_phone`, `user_birth`, `user_gender`, `create_date`, `update_date`, `user_address`, `user_email`, `user_image`, `user_status`, `grp_id`) VALUES
	(1, 'admin', '$2a$11$Ks6K/EEAdoxi1vVzNzKn9OoQsPM3fM20o3UfaGzOktdWHwZDMxzg6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- Dumping structure for table cook_solution.user_group
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE IF NOT EXISTS `user_group` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `grp_name` varchar(255) DEFAULT NULL,
  `grp_type` int(11) DEFAULT NULL,
  `grp_level` int(11) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `grp_description` varchar(255) DEFAULT NULL,
  `grp_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_group: ~0 rows (approximately)
DELETE FROM `user_group`;
INSERT INTO `user_group` (`id`, `grp_name`, `grp_type`, `grp_level`, `create_date`, `update_date`, `grp_description`, `grp_status`) VALUES
	(1, 'Admin', 0, 0, '2023-11-23 07:58:17', '2023-11-23 07:58:18', NULL, b'1'),
	(2, 'Supervisor', 1, 0, '2023-11-23 07:59:57', NULL, NULL, b'1'),
	(3, 'Normal User', 2, 0, '2023-11-23 08:00:40', NULL, 'Hội viên thường', b'1'),
	(4, 'VIP User', 2, 1, '2023-11-23 08:01:31', NULL, 'Hội viên VIP', b'1');

-- Dumping structure for table cook_solution.user_role
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rol_id` bigint(20) unsigned NOT NULL,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_role: ~0 rows (approximately)
DELETE FROM `user_role`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
