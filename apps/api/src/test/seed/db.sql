# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: pokemon_test
# Generation Time: 2023-02-23 21:11:04 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table pokemon
# ------------------------------------------------------------

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;

INSERT INTO `pokemon` (`id`, `name`, `slug`, `classification_id`, `evolution_requirement_amount`, `evolution_requirement_name`, `weight_minimum`, `weight_maximum`, `height_minimum`, `height_maximum`, `common_capture_area`, `flee_rate`, `max_cp`, `max_hp`, `next_evolution_id`)
VALUES
	(1, 'Bulbasaur', 'bulbasaur', 1, 25, 'Bulbasaur candies', 6.04, 7.76, 61, 79, NULL, 0.10, 951, 1071, 2),
	(2, 'Ivysaur', 'ivysaur', 1, 100, 'Bulbasaur candies', 11.38, 14.63, 88, 113, NULL, 0.07, 1483, 1632, 3),
	(3, 'Venusaur', 'venusaur', 1, NULL, NULL, 87.50, 112.50, 175, 225, NULL, 0.05, 2392, 2580, NULL),
	(4, 'Charmander', 'charmander', 2, 25, 'Charmander candies', 7.44, 9.56, 53, 68, NULL, 0.10, 841, 955, 5),
	(5, 'Charmeleon', 'charmeleon', 3, 100, 'Charmander candies', 16.63, 21.38, 96, 124, NULL, 0.07, 1411, 1557, 6),
	(6, 'Charizard', 'charizard', 3, NULL, NULL, 79.19, 101.81, 149, 191, NULL, 0.05, 2413, 2602, NULL),
	(7, 'Squirtle', 'squirtle', 4, 25, 'Squirtle candies', 7.88, 10.13, 44, 56, NULL, 0.10, 891, 1008, 8),
	(8, 'Wartortle', 'wartortle', 5, 100, 'Squirtle candies', 19.69, 25.31, 88, 113, NULL, 0.07, 1435, 1582, 9),
	(9, 'Blastoise', 'blastoise', 6, NULL, NULL, 74.81, 96.19, 140, 180, NULL, 0.05, 2355, 2542, NULL),
	(10, 'Caterpie', 'caterpie', 7, 12, 'Caterpie candies', 2.54, 3.26, 26, 34, NULL, 0.20, 367, 443, 11);


/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_attack
# ------------------------------------------------------------

LOCK TABLES `pokemon_attack` WRITE;
/*!40000 ALTER TABLE `pokemon_attack` DISABLE KEYS */;

INSERT INTO `pokemon_attack` (`id`, `name`, `type_id`, `category`, `damage`)
VALUES
	(1,'Tackle',11,'fast',12),
	(2,'Vine Whip',1,'fast',7),
	(3,'Power Whip',1,'special',70),
	(4,'Seed Bomb',1,'special',40),
	(5,'Sludge Bomb',2,'special',55),
	(6,'Razor Leaf',1,'fast',15),
	(7,'Solar Beam',1,'special',120),
	(8,'Petal Blizzard',1,'special',65),
	(9,'Ember',7,'fast',10),
	(10,'Scratch',11,'fast',6),
	(11,'Flame Burst',7,'special',30),
	(12,'Flame Charge',7,'special',25),
	(13,'Flamethrower',7,'special',55),
	(14,'Fire Punch',7,'special',40),
	(15,'Wing Attack',9,'fast',9),
	(16,'Dragon Claw',16,'special',35),
	(17,'Fire Blast',7,'special',100),
	(18,'Bubble',3,'fast',25),
	(19,'Aqua Jet',3,'special',25),
	(20,'Aqua Tail',3,'special',45),
	(21,'Water Pulse',3,'special',35),
	(22,'Bite',17,'fast',6),
	(23,'Water Gun',3,'fast',6),
	(24,'Gunk Shot',2,'special',65),
	(25,'Hydro Pump',3,'special',90),
	(26,'Ice Beam',8,'special',65),
	(27,'Flash Cannon',13,'special',60),
	(28,'Bug Bite',12,'fast',5),
	(29,'Struggle',11,'special',15);

/*!40000 ALTER TABLE `pokemon_attack` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_attack_pokemon
# ------------------------------------------------------------

LOCK TABLES `pokemon_attack_pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon_attack_pokemon` DISABLE KEYS */;

INSERT INTO `pokemon_attack_pokemon` (`pokemon_id`, `attack_id`)
VALUES
	(1,1),
	(7,1),
	(10,1),
	(1,2),
	(2,2),
	(3,2),
	(1,3),
	(2,3),
	(1,4),
	(1,5),
	(2,5),
	(3,5),
	(2,6),
	(3,6),
	(2,7),
	(3,7),
	(3,8),
	(4,9),
	(5,9),
	(6,9),
	(4,10),
	(5,10),
	(4,11),
	(5,11),
	(4,12),
	(4,13),
	(5,13),
	(6,13),
	(5,14),
	(6,15),
	(6,16),
	(6,17),
	(7,18),
	(7,19),
	(8,19),
	(7,20),
	(7,21),
	(8,22),
	(9,22),
	(8,23),
	(9,23),
	(8,24),
	(9,24),
	(8,25),
	(9,25),
	(8,26),
	(9,26),
	(9,27),
	(10,28),
	(10,29);

/*!40000 ALTER TABLE `pokemon_attack_pokemon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_classification
# ------------------------------------------------------------

LOCK TABLES `pokemon_classification` WRITE;
/*!40000 ALTER TABLE `pokemon_classification` DISABLE KEYS */;

INSERT INTO `pokemon_classification` (`id`, `name`)
VALUES
	(3,'Flame Pokémon'),
	(2,'Lizard Pokémon'),
	(1,'Seed Pokémon'),
	(6,'Shellfish Pokémon'),
	(4,'Tiny Turtle Pokémon'),
	(5,'Turtle Pokémon'),
	(7,'Worm Pokémon');

/*!40000 ALTER TABLE `pokemon_classification` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_resistant_pokemon
# ------------------------------------------------------------

LOCK TABLES `pokemon_resistant_pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon_resistant_pokemon` DISABLE KEYS */;

INSERT INTO `pokemon_resistant_pokemon` (`pokemon_id`, `type_id`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(4,1),
	(5,1),
	(6,1),
	(10,1),
	(1,3),
	(2,3),
	(3,3),
	(7,3),
	(8,3),
	(9,3),
	(1,4),
	(2,4),
	(3,4),
	(1,5),
	(2,5),
	(3,5),
	(6,5),
	(10,5),
	(1,6),
	(2,6),
	(3,6),
	(4,6),
	(5,6),
	(6,6),
	(4,7),
	(5,7),
	(6,7),
	(7,7),
	(8,7),
	(9,7),
	(4,8),
	(5,8),
	(7,8),
	(8,8),
	(9,8),
	(4,12),
	(5,12),
	(6,12),
	(4,13),
	(5,13),
	(6,13),
	(7,13),
	(8,13),
	(9,13),
	(10,14);

/*!40000 ALTER TABLE `pokemon_resistant_pokemon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_type
# ------------------------------------------------------------

LOCK TABLES `pokemon_type` WRITE;
/*!40000 ALTER TABLE `pokemon_type` DISABLE KEYS */;

INSERT INTO `pokemon_type` (`id`, `name`)
VALUES
	(12,'Bug'),
	(17,'Dark'),
	(16,'Dragon'),
	(4,'Electric'),
	(6,'Fairy'),
	(5,'Fighting'),
	(7,'Fire'),
	(9,'Flying'),
	(1,'Grass'),
	(14,'Ground'),
	(8,'Ice'),
	(11,'Normal'),
	(2,'Poison'),
	(10,'Psychic'),
	(15,'Rock'),
	(13,'Steel'),
	(3,'Water');

/*!40000 ALTER TABLE `pokemon_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_type_pokemon
# ------------------------------------------------------------

LOCK TABLES `pokemon_type_pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon_type_pokemon` DISABLE KEYS */;

INSERT INTO `pokemon_type_pokemon` (`pokemon_id`, `type_id`)
VALUES
	(1,1),
	(2,1),
	(3,1),
	(1,2),
	(2,2),
	(3,2),
	(7,3),
	(8,3),
	(9,3),
	(4,7),
	(5,7),
	(6,7),
	(6,9),
	(10,12);

/*!40000 ALTER TABLE `pokemon_type_pokemon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_vote
# ------------------------------------------------------------

LOCK TABLES `pokemon_vote` WRITE;
/*!40000 ALTER TABLE `pokemon_vote` DISABLE KEYS */;

INSERT INTO `pokemon_vote` (`pokemon_id`, `user_id`)
VALUES
	(3,'1'),
	(4,'1'),
	(5,'1'),
	(4,'2'),
	(8,'2'),
	(4,'3'),
	(6,'3');

/*!40000 ALTER TABLE `pokemon_vote` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_weakness_pokemon
# ------------------------------------------------------------

LOCK TABLES `pokemon_weakness_pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon_weakness_pokemon` DISABLE KEYS */;

INSERT INTO `pokemon_weakness_pokemon` (`pokemon_id`, `type_id`)
VALUES
	(7,1),
	(8,1),
	(9,1),
	(4,3),
	(5,3),
	(6,3),
	(6,4),
	(7,4),
	(8,4),
	(9,4),
	(1,7),
	(2,7),
	(3,7),
	(10,7),
	(1,8),
	(2,8),
	(3,8),
	(1,9),
	(2,9),
	(3,9),
	(10,9),
	(1,10),
	(2,10),
	(3,10),
	(4,14),
	(5,14),
	(4,15),
	(5,15),
	(6,15),
	(10,15);

/*!40000 ALTER TABLE `pokemon_weakness_pokemon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `created_at`)
VALUES
	('1','2023-02-23 18:09:26'),
	('2','2023-02-23 19:25:50'),
	('3','2023-02-23 20:10:25');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
