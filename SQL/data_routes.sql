-- NOTE : à exécuter en tant que ROOT !


-- ----------------------------------------------------------------------------
-- Base de Données & Utilisateur y ayant accès (en plus de l'admin 'root')
-- ----------------------------------------------------------------------------

CREATE DATABASE ROUTE_DATA ;


CREATE USER 'clearSky'@'localhost' IDENTIFIED BY 'clearSky';

GRANT ALL ON ROUTE_DATA.* TO 'clearSky'@'localhost';

FLUSH PRIVILEGES ;


-- ----------------------------------------------------------------------------
-- Pour purger
-- ----------------------------------------------------------------------------

-- DROP USER 'clearSky' ;
-- DROP DATABASE ROUTE_DATA ;



-- ----------------------------------------------------------------------------
-- Tables
-- ----------------------------------------------------------------------------

CREATE TABLE ROUTE_DATA.Flight (
	id VARCHAR( 20 ) NOT NULL PRIMARY KEY ,
	flight VARCHAR( 20 ) NOT NULL
) ENGINE = MYISAM ;


CREATE TABLE ROUTE_DATA.Route (
	idF VARCHAR( 20 ) NOT NULL ,
	name VARCHAR( 20 ) NOT NULL ,
	PRIMARY KEY (idF) ,
	FOREIGN KEY (idF) REFERENCES ROUTE_DATA.Flight(id)
) ENGINE = MYISAM ;


CREATE TABLE ROUTE_DATA.Coordinates (
	idF VARCHAR( 20 ) NOT NULL ,
	idR VARCHAR( 20 ) NOT NULL ,
	coordName VARCHAR( 20 ) NOT NULL ,
	DMSLat VARCHAR ( 20 ) NOT NULL ,
	DMSLon VARCHAR ( 20 ) NOT NULL ,
	DDLat DOUBLE( 17, 15 ) NOT NULL ,
	DDLon DOUBLE( 17, 15 ) NOT NULL ,
	PRIMARY KEY (coordName) ,
	FOREIGN KEY (idF) REFERENCES ROUTE_DATA.Flight(id) ,
	FOREIGN KEY (idR) REFERENCES ROUTE_DATA.Route(name)
) ENGINE = MYISAM ;


CREATE TABLE ROUTE_DATA.Weather (
	idF VARCHAR( 20 ) NOT NULL ,
	coordNameC VARCHAR( 20 ) NOT NULL ,
	location VARCHAR ( 20 ) NOT NULL ,
	temperature INTEGER ,
	windSpeed INTEGER ,
    windDirection VARCHAR ( 20 ) NOT NULL ,
    humidity INTEGER ,
	PRIMARY KEY (idF, coordNameC) ,
	FOREIGN KEY (idF) REFERENCES ROUTE_DATA.Flight(id) ,
	FOREIGN KEY (coordNameC) REFERENCES ROUTE_DATA.Coordinates(coordName)
) ENGINE = MYISAM ;


INSERT INTO ROUTE_DATA.Flight ( id , flight )
VALUES
('TS-IMW', 'TU-374' )
;


INSERT INTO ROUTE_DATA.Route ( idF, name )
VALUES
('TS-IMW', 'DTTA-DAAG')
;


INSERT INTO ROUTE_DATA.Coordinates ( idF, idR, coordName, DMSLat, DMSLon, DDLat, DDLon )
VALUES
('TS-IMW', 'DTTA-DAAG', 'DTTA', '36°50’7’’N', '010°14’7’’E', 36.8352778, 10.235277777777776),
('TS-IMW', 'DTTA-DAAG', 'KEMIR', '36°50’3’’N', '009°25’3’’E', 36.8341667, 9.417499999999999),
('TS-IMW', 'DTTA-DAAG', 'MORJA', '36°50’1’’N', '008°39’0’’E', 36.8336111, 8.65),
('TS-IMW', 'DTTA-DAAG', 'ANB', '36°49’9’’N', '007°48’9’’E', 36.7858333, 7.8025),
('TS-IMW', 'DTTA-DAAG', 'JIL', '36°47’9’’N', '005°51’5’’E', 36.7858333, 5.851388888888889),
('TS-IMW', 'DTTA-DAAG', 'BJA', '36°42’9’’N', '005°04’6’’E', 36.7025, 5.068333333333333),
('TS-IMW', 'DTTA-DAAG', 'BNA', '36°39’1’’N', '003°35’5’’E', 36.6502778, 3.5847222222222226),
('TS-IMW', 'DTTA-DAAG', 'DAAG', '36°41’6’’N', '003°12’9’’E', 36.685, 3.2025)
;