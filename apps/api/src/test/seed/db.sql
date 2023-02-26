# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.26)
# Database: pokemon
# Generation Time: 2023-02-26 13:09:12 +0000
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
	(1,'Bulbasaur','bulbasaur',1,25,'Bulbasaur candies',6.04,7.76,61,79,NULL,0.10,951,1071,2),
	(2,'Ivysaur','ivysaur',1,100,'Bulbasaur candies',11.38,14.63,88,113,NULL,0.07,1483,1632,3),
	(3,'Venusaur','venusaur',1,NULL,NULL,87.50,112.50,175,225,NULL,0.05,2392,2580,NULL),
	(4,'Charmander','charmander',2,25,'Charmander candies',7.44,9.56,53,68,NULL,0.10,841,955,5),
	(5,'Charmeleon','charmeleon',3,100,'Charmander candies',16.63,21.38,96,124,NULL,0.07,1411,1557,6),
	(6,'Charizard','charizard',3,NULL,NULL,79.19,101.81,149,191,NULL,0.05,2413,2602,NULL),
	(7,'Squirtle','squirtle',4,25,'Squirtle candies',7.88,10.13,44,56,NULL,0.10,891,1008,8),
	(8,'Wartortle','wartortle',5,100,'Squirtle candies',19.69,25.31,88,113,NULL,0.07,1435,1582,9),
	(9,'Blastoise','blastoise',6,NULL,NULL,74.81,96.19,140,180,NULL,0.05,2355,2542,NULL),
	(10,'Caterpie','caterpie',7,12,'Caterpie candies',2.54,3.26,26,34,NULL,0.20,367,443,11),
	(11,'Metapod','metapod',8,50,'Caterpie candies',8.66,11.14,61,79,NULL,0.09,397,477,12),
	(12,'Butterfree','butterfree',9,NULL,NULL,28.00,36.00,96,124,NULL,0.06,1315,1454,NULL),
	(13,'Weedle','weedle',10,12,'Weedle candies',2.80,3.60,26,34,NULL,0.20,372,449,14),
	(14,'Kakuna','kakuna',8,50,'Weedle candies',8.75,11.25,53,68,NULL,0.09,405,485,15),
	(15,'Beedrill','beedrill',11,NULL,NULL,25.81,33.19,88,113,NULL,0.06,1301,1439,NULL),
	(16,'Pidgey','pidgey',12,12,'Pidgey candies',1.57,2.02,26,34,NULL,0.20,585,679,17),
	(17,'Pidgeotto','pidgeotto',13,50,'Pidgey candies',26.25,33.75,96,124,NULL,0.09,1096,1223,18),
	(18,'Pidgeot','pidgeot',13,NULL,NULL,34.56,44.44,131,169,NULL,0.06,1923,2091,NULL),
	(19,'Rattata','rattata',14,25,'Rattata candies',3.06,3.94,26,34,NULL,0.20,493,581,20),
	(20,'Raticate','raticate',14,NULL,NULL,16.19,20.81,61,79,NULL,0.07,1304,1444,NULL),
	(21,'Spearow','spearow',12,50,'Spearow candies',1.75,2.25,26,34,NULL,0.15,591,686,22),
	(22,'Fearow','fearow',15,NULL,NULL,33.25,42.75,105,135,NULL,0.07,1592,1746,NULL),
	(23,'Ekans','ekans',16,50,'Ekans candies',6.04,7.76,175,225,NULL,0.15,718,824,24),
	(24,'Arbok','arbok',17,NULL,NULL,56.88,73.13,306,394,NULL,0.07,1611,1767,NULL),
	(25,'Pikachu','pikachu',14,50,'Pikachu candies',5.25,6.75,35,45,NULL,0.10,777,887,26),
	(26,'Raichu','raichu',14,NULL,NULL,26.25,33.75,70,90,NULL,0.06,1859,2028,NULL),
	(27,'Sandshrew','sandshrew',14,50,'Sandshrew candies',10.50,13.50,53,68,NULL,0.10,695,798,28),
	(28,'Sandslash','sandslash',14,NULL,NULL,25.81,33.19,88,113,NULL,0.06,1654,1810,NULL),
	(29,'Nidoran-F','nidoran-f',18,25,'Nidoran♀ candies',6.13,7.88,35,45,NULL,0.15,768,876,30),
	(30,'Nidorina','nidorina',18,100,'Nidoran♀ candies',17.50,22.50,70,90,NULL,0.07,1267,1404,NULL);

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
	(29,'Struggle',11,'special',15),
	(30,'Confusion',10,'fast',15),
	(31,'Bug Buzz',12,'special',75),
	(32,'Psychic',10,'special',55),
	(33,'Signal Beam',12,'special',45),
	(34,'Poison Sting',2,'fast',6),
	(35,'Poison Jab',2,'fast',12),
	(36,'Aerial Ace',9,'special',30),
	(37,'X Scissor',12,'special',35),
	(38,'Quick Attack',11,'fast',10),
	(39,'Air Cutter',9,'special',30),
	(40,'Twister',16,'special',25),
	(41,'Steel Wing',13,'fast',15),
	(42,'Hurricane',9,'special',80),
	(43,'Body Slam',11,'special',40),
	(44,'Dig',14,'special',70),
	(45,'Hyper Fang',11,'special',35),
	(46,'Hyper Beam',11,'special',120),
	(47,'Peck',9,'fast',10),
	(48,'Drill Peck',9,'special',40),
	(49,'Drill Run',14,'special',50),
	(50,'Acid',2,'fast',10),
	(51,'Wrap',11,'special',25),
	(52,'Dark Pulse',17,'special',45),
	(53,'Sludge Wave',2,'special',70),
	(54,'Thunder Shock',4,'fast',5),
	(55,'Discharge',4,'special',35),
	(56,'Thunder',4,'special',100),
	(57,'Thunderbolt',4,'special',55),
	(58,'Spark',4,'fast',7),
	(59,'Brick Break',5,'special',30),
	(60,'Thunder Punch',4,'special',40),
	(61,'Mud Shot',14,'fast',6),
	(62,'Rock Slide',15,'special',50),
	(63,'Rock Tomb',15,'special',30),
	(64,'Metal Claw',13,'fast',8),
	(65,'Bulldoze',14,'special',35),
	(66,'Earthquake',14,'special',100),
	(67,'Poison Fang',2,'special',25);

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
	(11,1),
	(16,1),
	(19,1),
	(1,2),
	(2,2),
	(3,2),
	(1,3),
	(2,3),
	(1,4),
	(1,5),
	(2,5),
	(3,5),
	(15,5),
	(23,5),
	(29,5),
	(30,5),
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
	(27,10),
	(4,11),
	(5,11),
	(4,12),
	(4,13),
	(5,13),
	(6,13),
	(5,14),
	(6,15),
	(17,15),
	(18,15),
	(6,16),
	(6,17),
	(7,18),
	(7,19),
	(8,19),
	(7,20),
	(7,21),
	(8,22),
	(9,22),
	(20,22),
	(24,22),
	(29,22),
	(30,22),
	(8,23),
	(9,23),
	(8,24),
	(9,24),
	(23,24),
	(24,24),
	(8,25),
	(9,25),
	(8,26),
	(9,26),
	(9,27),
	(10,28),
	(11,28),
	(12,28),
	(13,28),
	(14,28),
	(15,28),
	(10,29),
	(11,29),
	(13,29),
	(14,29),
	(12,30),
	(12,31),
	(12,32),
	(12,33),
	(13,34),
	(14,34),
	(23,34),
	(29,34),
	(30,34),
	(15,35),
	(15,36),
	(16,36),
	(17,36),
	(18,36),
	(21,36),
	(22,36),
	(15,37),
	(16,38),
	(19,38),
	(20,38),
	(21,38),
	(25,38),
	(16,39),
	(17,39),
	(18,39),
	(16,40),
	(17,40),
	(21,40),
	(22,40),
	(17,41),
	(18,41),
	(22,41),
	(18,42),
	(19,43),
	(29,43),
	(19,44),
	(20,44),
	(27,44),
	(30,44),
	(19,45),
	(20,45),
	(20,46),
	(21,47),
	(22,47),
	(21,48),
	(22,49),
	(23,50),
	(24,50),
	(23,51),
	(24,52),
	(24,53),
	(25,54),
	(26,54),
	(25,55),
	(25,56),
	(26,56),
	(25,57),
	(26,58),
	(26,59),
	(26,60),
	(27,61),
	(28,61),
	(27,62),
	(27,63),
	(28,63),
	(28,64),
	(28,65),
	(28,66),
	(29,67),
	(30,67);

/*!40000 ALTER TABLE `pokemon_attack_pokemon` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table pokemon_classification
# ------------------------------------------------------------

LOCK TABLES `pokemon_classification` WRITE;
/*!40000 ALTER TABLE `pokemon_classification` DISABLE KEYS */;

INSERT INTO `pokemon_classification` (`id`, `name`)
VALUES
	(15,'Beak Pokémon'),
	(13,'Bird Pokémon'),
	(9,'Butterfly Pokémon'),
	(17,'Cobra Pokémon'),
	(8,'Cocoon Pokémon'),
	(3,'Flame Pokémon'),
	(10,'Hairy Pokémon'),
	(2,'Lizard Pokémon'),
	(14,'Mouse Pokémon'),
	(11,'Poison Bee Pokémon'),
	(18,'Poison Pin Pokémon'),
	(1,'Seed Pokémon'),
	(6,'Shellfish Pokémon'),
	(16,'Snake Pokémon'),
	(12,'Tiny Bird Pokémon'),
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
	(11,1),
	(12,1),
	(13,1),
	(14,1),
	(15,1),
	(16,1),
	(17,1),
	(18,1),
	(21,1),
	(22,1),
	(23,1),
	(24,1),
	(29,1),
	(30,1),
	(13,2),
	(14,2),
	(15,2),
	(23,2),
	(24,2),
	(27,2),
	(28,2),
	(29,2),
	(30,2),
	(1,3),
	(2,3),
	(3,3),
	(7,3),
	(8,3),
	(9,3),
	(1,4),
	(2,4),
	(3,4),
	(25,4),
	(26,4),
	(27,4),
	(28,4),
	(1,5),
	(2,5),
	(3,5),
	(6,5),
	(10,5),
	(11,5),
	(12,5),
	(13,5),
	(14,5),
	(15,5),
	(23,5),
	(24,5),
	(29,5),
	(30,5),
	(1,6),
	(2,6),
	(3,6),
	(4,6),
	(5,6),
	(6,6),
	(13,6),
	(14,6),
	(15,6),
	(23,6),
	(24,6),
	(29,6),
	(30,6),
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
	(25,9),
	(26,9),
	(4,12),
	(5,12),
	(6,12),
	(12,12),
	(13,12),
	(14,12),
	(15,12),
	(16,12),
	(17,12),
	(18,12),
	(21,12),
	(22,12),
	(23,12),
	(24,12),
	(29,12),
	(30,12),
	(4,13),
	(5,13),
	(6,13),
	(7,13),
	(8,13),
	(9,13),
	(25,13),
	(26,13),
	(10,14),
	(11,14),
	(12,14),
	(16,14),
	(17,14),
	(18,14),
	(21,14),
	(22,14),
	(27,15),
	(28,15),
	(16,18),
	(17,18),
	(18,18),
	(19,18),
	(20,18),
	(21,18),
	(22,18);

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
	(18,'Ghost'),
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
	(13,2),
	(14,2),
	(15,2),
	(23,2),
	(24,2),
	(29,2),
	(30,2),
	(7,3),
	(8,3),
	(9,3),
	(25,4),
	(26,4),
	(4,7),
	(5,7),
	(6,7),
	(6,9),
	(12,9),
	(16,9),
	(17,9),
	(18,9),
	(21,9),
	(22,9),
	(16,11),
	(17,11),
	(18,11),
	(19,11),
	(20,11),
	(21,11),
	(22,11),
	(10,12),
	(11,12),
	(12,12),
	(13,12),
	(14,12),
	(15,12),
	(27,14),
	(28,14);

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
	(27,1),
	(28,1),
	(4,3),
	(5,3),
	(6,3),
	(27,3),
	(28,3),
	(6,4),
	(7,4),
	(8,4),
	(9,4),
	(12,4),
	(16,4),
	(17,4),
	(18,4),
	(21,4),
	(22,4),
	(19,5),
	(20,5),
	(1,7),
	(2,7),
	(3,7),
	(10,7),
	(11,7),
	(12,7),
	(13,7),
	(14,7),
	(15,7),
	(1,8),
	(2,8),
	(3,8),
	(12,8),
	(16,8),
	(17,8),
	(18,8),
	(21,8),
	(22,8),
	(27,8),
	(28,8),
	(1,9),
	(2,9),
	(3,9),
	(10,9),
	(11,9),
	(12,9),
	(13,9),
	(14,9),
	(15,9),
	(1,10),
	(2,10),
	(3,10),
	(13,10),
	(14,10),
	(15,10),
	(23,10),
	(24,10),
	(29,10),
	(30,10),
	(4,14),
	(5,14),
	(23,14),
	(24,14),
	(25,14),
	(26,14),
	(29,14),
	(30,14),
	(4,15),
	(5,15),
	(6,15),
	(10,15),
	(11,15),
	(12,15),
	(13,15),
	(14,15),
	(15,15),
	(16,15),
	(17,15),
	(18,15),
	(21,15),
	(22,15);

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
