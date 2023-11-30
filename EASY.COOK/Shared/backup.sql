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

-- Dumping structure for table cook_solution.buy_detail
DROP TABLE IF EXISTS `buy_detail`;
CREATE TABLE IF NOT EXISTS `buy_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `buy_plan_id` bigint(20) NOT NULL,
  `ingredient_id` bigint(20) NOT NULL,
  `quantity` decimal(18,2) DEFAULT NULL,
  `actual_quantity` decimal(18,2) DEFAULT NULL,
  `ingredient_status` char(1) DEFAULT NULL COMMENT '0: todo 1: progress 2:done',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.buy_detail: ~0 rows (approximately)
DELETE FROM `buy_detail`;

-- Dumping structure for table cook_solution.buy_plan
DROP TABLE IF EXISTS `buy_plan`;
CREATE TABLE IF NOT EXISTS `buy_plan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `buy_name` varchar(255) DEFAULT NULL,
  `buy_type` int(11) DEFAULT NULL COMMENT '0: chính, 1:bổ sung, 2: dự phòng',
  `buy_description` varchar(255) DEFAULT NULL,
  `buy_date` timestamp NULL DEFAULT NULL,
  `buy_creater` varchar(60) NOT NULL,
  `buy_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.buy_plan: ~0 rows (approximately)
DELETE FROM `buy_plan`;

-- Dumping structure for table cook_solution.eat_detail
DROP TABLE IF EXISTS `eat_detail`;
CREATE TABLE IF NOT EXISTS `eat_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `eat_plan_id` bigint(20) NOT NULL,
  `menu_id` bigint(20) NOT NULL,
  `quantity` decimal(18,2) DEFAULT NULL,
  `actual_quantity` decimal(18,2) DEFAULT NULL,
  `menu_status` char(1) DEFAULT NULL COMMENT '0: todo 1: progress 2:done',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.eat_detail: ~0 rows (approximately)
DELETE FROM `eat_detail`;

-- Dumping structure for table cook_solution.eat_plan
DROP TABLE IF EXISTS `eat_plan`;
CREATE TABLE IF NOT EXISTS `eat_plan` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `eat_name` varchar(255) DEFAULT NULL,
  `eat_type` int(11) DEFAULT NULL COMMENT '0: dailly, 1: weekly, 2:monthly, 3:other',
  `eat_description` varchar(255) DEFAULT NULL,
  `eat_start_date` timestamp NULL DEFAULT NULL,
  `eat_end_date` timestamp NULL DEFAULT NULL,
  `eat_creater` varchar(60) NOT NULL,
  `eat_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  `total_energy` decimal(18,2) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.eat_plan: ~0 rows (approximately)
DELETE FROM `eat_plan`;

-- Dumping structure for table cook_solution.ingredient
DROP TABLE IF EXISTS `ingredient`;
CREATE TABLE IF NOT EXISTS `ingredient` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ing_type` char(1) DEFAULT NULL COMMENT '0: Nhóm bột đường 1: Nhóm chất đạm 2: Nhóm chất béo 3: Nhóm vitamin và khoáng chất',
  `ing_name` varchar(255) DEFAULT NULL,
  `ing_unit` varchar(20) DEFAULT NULL,
  `ing_img` varchar(255) DEFAULT NULL,
  `nut_category_id` bigint(20) DEFAULT NULL,
  `ing_quantity` decimal(18,2) DEFAULT NULL,
  `ing_exp_date` timestamp NULL DEFAULT NULL,
  `ing_origin` varchar(255) DEFAULT NULL COMMENT 'nguồn gốc xuất xứ',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.ingredient: ~0 rows (approximately)
DELETE FROM `ingredient`;

-- Dumping structure for table cook_solution.menu
DROP TABLE IF EXISTS `menu`;
CREATE TABLE IF NOT EXISTS `menu` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_group` char(1) DEFAULT NULL COMMENT '0: món chính 1: món phụ 2: món tráng miệng 3: trẻ em',
  `menu_request_type` int(11) DEFAULT NULL COMMENT '0: bt 1: ăn kiêng 2:ăn chay 3: ít calo, 4: giàu chất xơ, 5: hải sản, 6: nướng, 7: chế biến nhanh',
  `menu_localtion_type` char(1) DEFAULT NULL COMMENT '0: VN 1: TQ 2:Châu Âu',
  `menu_name` varchar(255) DEFAULT NULL,
  `menu_img` varchar(255) DEFAULT NULL,
  `menu_short_desc` varchar(100) DEFAULT NULL,
  `menu_description` varchar(255) DEFAULT NULL,
  `ingredient_ids` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '' COMMENT '[ing_id_1,ing_id_2,...]',
  `menu_refer` varchar(255) DEFAULT NULL COMMENT 'Món tương tự',
  `menu_combine` varchar(255) DEFAULT NULL COMMENT 'món ăn kèm, kết hợp',
  `recipe_id` bigint(20) NOT NULL,
  `menu_energy` decimal(18,2) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.menu: ~0 rows (approximately)
DELETE FROM `menu`;

-- Dumping structure for table cook_solution.menu_near
DROP TABLE IF EXISTS `menu_near`;
CREATE TABLE IF NOT EXISTS `menu_near` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `menu_ids` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '' COMMENT '[menu_id_1,menu_id_2,...]',
  `res_name` varchar(255) DEFAULT NULL,
  `res_type` char(1) DEFAULT NULL COMMENT '0: nhà hàng, 1: quán ăn, 2: quán nhậu, 3: buffet',
  `res_price` decimal(18,2) DEFAULT NULL,
  `res_address` varchar(255) DEFAULT NULL,
  `res_phone` varchar(20) DEFAULT NULL,
  `res_time_serve` varchar(100) DEFAULT NULL,
  `res_map` varchar(255) DEFAULT NULL,
  `res_rate` varchar(20) DEFAULT NULL,
  `res_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.menu_near: ~0 rows (approximately)
DELETE FROM `menu_near`;

-- Dumping structure for table cook_solution.notification
DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `not_type` int(11) DEFAULT NULL COMMENT '0: regular, 1: not regular',
  `not_method` int(11) DEFAULT NULL COMMENT '0: app, 1: email, 2: tin nhắn, 3: khác',
  `not_schedule` varchar(50) DEFAULT NULL COMMENT 'tần suất thông báo',
  `not_content` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `not_status` bit(1) DEFAULT NULL COMMENT '1: send 0: not send',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `not_config` char(1) DEFAULT NULL COMMENT '0: cho phép gửi lại, 1: không cho phép gửi',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.notification: ~0 rows (approximately)
DELETE FROM `notification`;

-- Dumping structure for table cook_solution.nutrition_category
DROP TABLE IF EXISTS `nutrition_category`;
CREATE TABLE IF NOT EXISTS `nutrition_category` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `nut_name` varchar(255) DEFAULT NULL,
  `nut_unit` varchar(20) DEFAULT NULL,
  `nut_carbohydrate` decimal(18,2) DEFAULT NULL,
  `nut_fat` decimal(18,2) DEFAULT NULL,
  `nut_protein` decimal(18,2) DEFAULT NULL,
  `nut_vitamin` decimal(18,2) DEFAULT NULL,
  `nut_minerals` decimal(18,2) DEFAULT NULL,
  `nut_calo` decimal(18,2) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.nutrition_category: ~0 rows (approximately)
DELETE FROM `nutrition_category`;

-- Dumping structure for table cook_solution.rate_comment
DROP TABLE IF EXISTS `rate_comment`;
CREATE TABLE IF NOT EXISTS `rate_comment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `parrent_id` bigint(20) unsigned DEFAULT 0 COMMENT 'Reply comment',
  `rate_value` int(11) DEFAULT NULL,
  `rate_title` varchar(255) DEFAULT NULL,
  `com_content` varchar(255) DEFAULT NULL,
  `creater` varchar(60) DEFAULT NULL,
  `menu_id` bigint(20) DEFAULT NULL,
  `rec_id` bigint(20) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `rate_state` char(1) DEFAULT NULL COMMENT '0: public 1:private 2: delete',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.rate_comment: ~0 rows (approximately)
DELETE FROM `rate_comment`;

-- Dumping structure for table cook_solution.recipe
DROP TABLE IF EXISTS `recipe`;
CREATE TABLE IF NOT EXISTS `recipe` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rec_type` char(1) DEFAULT NULL COMMENT '0: bt 1: món nóng 2: món lạnh',
  `rec_name` varchar(255) DEFAULT NULL,
  `rec_description` varchar(255) DEFAULT NULL,
  `rec_img` varchar(255) DEFAULT NULL,
  `rec_energy` decimal(18,2) DEFAULT NULL,
  `rec_time_prepare` decimal(18,2) DEFAULT NULL COMMENT 'thời gian chuẩn bị ước tính theo phút',
  `rec_time_practice` decimal(18,2) DEFAULT NULL COMMENT 'thời gian nấu ước tính theo phút',
  `rec_num_person` int(11) DEFAULT NULL COMMENT 'đủ cho số người ăn',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.recipe: ~0 rows (approximately)
DELETE FROM `recipe`;

-- Dumping structure for table cook_solution.recipe_detail
DROP TABLE IF EXISTS `recipe_detail`;
CREATE TABLE IF NOT EXISTS `recipe_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rec_id` bigint(20) NOT NULL,
  `ingredient_id` bigint(20) NOT NULL,
  `quantity` decimal(18,2) DEFAULT NULL,
  `sequence` int(11) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.recipe_detail: ~0 rows (approximately)
DELETE FROM `recipe_detail`;

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

-- Dumping data for table cook_solution.user: ~0 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `user_id`, `user_pass`, `user_name`, `user_phone`, `user_birth`, `user_gender`, `create_date`, `update_date`, `user_address`, `user_email`, `user_image`, `user_status`, `grp_id`) VALUES
	(1, 'admin', '$2a$11$Ks6K/EEAdoxi1vVzNzKn9OoQsPM3fM20o3UfaGzOktdWHwZDMxzg6', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- Dumping structure for table cook_solution.user_allergy_favorite
DROP TABLE IF EXISTS `user_allergy_favorite`;
CREATE TABLE IF NOT EXISTS `user_allergy_favorite` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `menu_id` bigint(20) DEFAULT NULL,
  `ingredient_id` bigint(20) DEFAULT NULL,
  `priority` char(1) DEFAULT NULL COMMENT '0: normal 1: medium 2:high',
  `af_type` bit(1) DEFAULT NULL COMMENT '1: allergy 0: favorite',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_allergy_favorite: ~0 rows (approximately)
DELETE FROM `user_allergy_favorite`;

-- Dumping structure for table cook_solution.user_group
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE IF NOT EXISTS `user_group` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `grp_name` varchar(255) DEFAULT NULL,
  `grp_type` int(11) DEFAULT NULL COMMENT '0: Admin, 1: supervisor, 2: user',
  `grp_level` int(11) DEFAULT NULL COMMENT '0: normal, 1: VIP',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `grp_description` varchar(255) DEFAULT NULL,
  `grp_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_group: ~3 rows (approximately)
DELETE FROM `user_group`;
INSERT INTO `user_group` (`id`, `grp_name`, `grp_type`, `grp_level`, `create_date`, `update_date`, `grp_description`, `grp_status`) VALUES
	(1, 'Admin', 0, 0, '2023-11-23 07:58:17', '2023-11-23 07:58:18', NULL, b'1'),
	(2, 'Supervisor', 1, 0, '2023-11-23 07:59:57', NULL, NULL, b'1'),
	(3, 'Normal User', 2, 0, '2023-11-23 08:00:40', NULL, 'Hội viên thường', b'1'),
	(4, 'VIP User', 2, 1, '2023-11-23 08:01:31', NULL, 'Hội viên VIP', b'1');

-- Dumping structure for table cook_solution.user_health
DROP TABLE IF EXISTS `user_health`;
CREATE TABLE IF NOT EXISTS `user_health` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `heal_bmi` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `heal_beat` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `blood_pressure` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `calo_use` decimal(18,2) DEFAULT NULL,
  `heal_evalue` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `menu_suggestion` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_health: ~0 rows (approximately)
DELETE FROM `user_health`;

-- Dumping structure for table cook_solution.user_payment
DROP TABLE IF EXISTS `user_payment`;
CREATE TABLE IF NOT EXISTS `user_payment` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `amount` decimal(18,2) DEFAULT NULL,
  `pay_method` varchar(100) DEFAULT NULL,
  `pay_status` bit(1) DEFAULT NULL COMMENT '1: active 0: unactive',
  `pay_description` varchar(255) DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  `vou_ids` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '' COMMENT '[vou_id_1,vou_id_2,...]',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_payment: ~0 rows (approximately)
DELETE FROM `user_payment`;

-- Dumping structure for table cook_solution.user_role
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `rol_id` bigint(20) NOT NULL,
  `user_id` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.user_role: ~0 rows (approximately)
DELETE FROM `user_role`;

-- Dumping structure for table cook_solution.voucher
DROP TABLE IF EXISTS `voucher`;
CREATE TABLE IF NOT EXISTS `voucher` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `vou_name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `vou_value` decimal(18,2) DEFAULT NULL,
  `vou_quantity` decimal(18,2) DEFAULT NULL,
  `vou_type` int(11) DEFAULT NULL COMMENT '0: normal, 1: limit time, 2: limit quantity',
  `vou_end_date` timestamp NULL DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT NULL,
  `update_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table cook_solution.voucher: ~0 rows (approximately)
DELETE FROM `voucher`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
