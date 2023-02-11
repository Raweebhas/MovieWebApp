DROP DATABASE IF EXISTS imdb_test;
CREATE DATABASE IF NOT EXISTS imdb_test;
USE imdb_test;


DROP TABLE IF EXISTS country;
CREATE TABLE country (
	countryID 			INT		NOT NULL,
    countryName			VARCHAR(35)		NOT NULL
);

ALTER TABLE country
	ADD PRIMARY KEY(countryID);


INSERT INTO country(countryID,countryName) VALUES
(101256,"Korea"),
(20236,"Japan"),
(31357,"United Kingdom"),
(43468,"United States"),
(54579,"Spain"),
(21847,"Canada");


DROP TABLE IF EXISTS movie;

create table movie (
	movieID 	VARCHAR(20)		NOT NULL,
    IMDB_rating	DECIMAL(4,2)		NOT NULL,
    CONSTRAINT chk_IMDB_rating check (IMDB_rating >=0 AND IMDB_rating<=10),
    movieName	VARCHAR(70)		NOT NULL,
    countryID	INT,
    movieDescripiton	VARCHAR(1000),
    CONSTRAINT FK_movCount FOREIGN KEY (countryID) REFERENCES country(countryID),
    movieType VARCHAR(20) NOT NULL
);

INSERT INTO movie(movieID,IMDB_rating,movieName,countryID,movieDescripiton,movieType) VALUES
-- ("tt2625030",7.6,"New World",101256,"An undercover cop finds it difficult to play both a cop and a goon.","movie"),
("tt13651628",7.3,"Belle",20236,"Suzu is a shy high school student living in a rural village. For years, she has only been a shadow of herself.","movie"),
("tt4857264",8.1,"The Invisible Guest",54579,"A successful entrepreneur accused of murder and a witness preparation expert have less than three hours to come up with an impregnable defense.","movie"),
("tt3046008",6.9,"Dust",20236,"In a harsh and unpredictable natural environment where people have isolated themselves behind massive walled cities, a socially marginalized Tracker teams up with a black-market merchant to save the industrial society that has rejected his way of life.","short"),
("tt1553917",7.5,"The Illusionist",31357,"The journey of a magician performing illusions to amaze and humour.","short"),
("tt2148945",7.4,"Empire of Dust",43468,"Lao Yang and Eddy both work for a company called CREC. They have just set up camp near the remote mining town of Kolwezi in the Katanga province of the RDC.","documentary"),
("tt0154506",7.5,"Following",31357,"A young writer who follows strangers for material meets a thief who takes him under his wing.","movie"),
("tt0068646",9.2,"The Godfather",43468,"The Godfather follows Vito Corleone Don of the Corleone family as he passes the mantel to his son Michael","movie"),
("tt9280016",7.6,"When the Dust Settles","31357","The interweaved stories of 8 very different people during the days before and after a terrorist attack shocks Copenhagen, all fundamentally changed by the tragic incident.","TVSeries");
-- SELECT * FROM movie;
-- SELECT movieName,IMDB_rating FROM movie WHERE movieName LIKE "Dust" AND movietype = "shortMovie" OR movietype="movie";



DROP TABLE IF EXISTS user_;
CREATE TABLE user_(
	userID		VARCHAR(10) 	primary key,
    username	VARChAR(50)		NOT NULL,
    u_password	VARCHAR(25)		NOT NULL,
    email		VARCHAR(40)		NOT NULL,
    firstname	VARCHAR(50)		NOT NULL,
    lastname	VARCHAR(50)		NOT NULL,
    middlename	VARCHAR(20),
    DateOfBirth	DATE			NOT NULL,
    gender 		CHAR(1)			NOT NULL,
    bio			VARCHAR(100),
    CONSTRAINT check(gender in ("M","F"))
);

INSERT INTO user_(userID,username,u_password,email,firstname,lastname,middlename,DateOfBirth,gender,bio) VALUES
-- (104142,"nnloat","123456789","nno1212@gmail.com","Oatty","Oat",null,"1990-2-1","M",null),
("421233","dark1x","passw12123322","rinnerman@gmail.com","Johny","John","M","1970-6-24","M","I love playing games"),
("421356","darktherine","95LLmyXyqA","darky@gmail.com","James","Hatfield","M","1972-6-25","M","Quality people"),
("589598","kojima121","kojiNx5897x","hideo@gmail.com","Hideo","Kojima",null,"1985-9-30","M","I love watching movie"),
("845844","AniMVHS","an87xNxiUkyjZ9","aniii@outlook.com","Anne","Lawrence",null,"2005-7-14","F","Dog/cat person"),
("696887","sixveceer","sixtysixXLr8","yoyosix@gmail.com","Janey","Jane","S","1995-1-31","F",null);

 -- SELECT * FROM user_ WHERE username LIKE "%dark%" OR firstname LIKE "%dark%";
-- SELECT * FROM user_ WHERE userID LIKE '%dark%' OR firstname LIKE '%dark%' OR username LIKE '%dark%'
SELECT * FROM user_ WHERE userID LIKE '%%'