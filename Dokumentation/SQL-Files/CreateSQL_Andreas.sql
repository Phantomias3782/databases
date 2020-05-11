/* Create all Tables */
CREATE TABLE IF NOT EXISTS User_Table(
	F_Name 			VARCHAR(30),
	L_Name 			VARCHAR(30),
	UserID 			INT PRIMARY KEY,
	Zip_Code 		INT,
	City 			VARCHAR(20),
	Home_State		VARCHAR(30),
	Country			VARCHAR(20),
	eMail			VARCHAR(30),
	BIRTHDATE		DATE,
	AboType			VARCHAR(10),
	BankAccount		VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS Payment(
	Payment_ID		INT PRIMARY KEY,
	UserID			INT,
	TimeStamp		DATE,
	Actual_State	BOOLEAN,
	FOREIGN KEY (UserID) REFERENCES User_Table(UserID)
);

CREATE TABLE IF NOT EXISTS Genre(
	GenreID			INT PRIMARY KEY,
	GenreName		VARCHAR(20),
	GenreDescription VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Actors(
	ActorID			INT PRIMARY KEY,
	ActorName		VARCHAR(30),
	Birthdate		DATE,
	MovieIDs		INT
);

CREATE TABLE IF NOT EXISTS Directors(
	DirectorID		INT PRIMARY KEY,
	DirectorName	VARCHAR(30),
	Birthdate		DATE,
	MovieIDs		INT
);

CREATE TABLE IF NOT EXISTS Movies(
	MovieID 		INT PRIMARY KEY,
	MovieLength		INT,
	MovieName		VARCHAR(30),
	GenreID			INT,
	DirectorID		INT,
	ActorID			INT,
	Studio			VARCHAR(20),
	Description		VARCHAR(100),
	AgeRating		INT,
	FOREIGN KEY (GenreID) REFERENCES Genre(GenreID),
	FOREIGN KEY (DirectorID) REFERENCES Directors(DirectorID),
	FOREIGN KEY (ActorID) REFERENCES Actors(ActorID)
);

CREATE TABLE IF NOT EXISTS Watchlist(
	UserID 			INT,
	MovieID			INT,
	Foreign KEY (UserID) REFERENCES User_Table(UserID),
	FOREIGN KEY (MovieID) REFERENCES Movies(MovieID)
);

CREATE TABLE IF NOT EXISTS Ratings(
	RatingID		INT PRIMARY KEY,
	MovieID			INT,
	UserID			INT,
	RATING			INT,
	TextRating		VARCHAR(100),
	FOREIGN KEY (MovieID) REFERENCES Movies(MovieID),
	FOREIGN KEY (UserID) REFERENCES User_Table(UserID)
);

/* Add Foreign Key to Tables who reference each other*/
ALTER TABLE Actors ADD FOREIGN KEY (MovieIDs) REFERENCES Movies(MovieID);
ALTER TABLE Directors ADD FOREIGN KEY (MovieIDs) REFERENCES Movies(MovieID);

/*Add some data and delete old data */

TRUNCATE Actors CASCADE;
TRUNCATE Directors CASCADE;
TRUNCATE Genre CASCADE;
TRUNCATE Movies CASCADE;
TRUNCATE Payment CASCADE;
TRUNCATE User_Table CASCADE;
TRUNCATE Watchlist CASCADE;

INSERT INTO Actors(
	actorid, actorname, birthdate, movieids)
	VALUES (1, 'Peter Dinklage', '07.11.1975', null),
			(2, 'Sophie Turner', '02.22.1981', null),
			(3, 'Emilia Clarke', '07.02.1991', null);

INSERT INTO Directors(
	directorid, directorname, birthdate, movieids)
	VALUES (1, 'Denies Villneuv', '01.01.1999', null),
			(2, 'David Cameron', '09.19.1956', null),
			(3, 'Rian Coogler', '12.24.1989', null);

INSERT INTO Genre(
	genreid, genrename, genredescription)
	VALUES (1, 'Action', 'Something explodes.'),
			(2, 'Drama', 'Really dramatic.'),
			(3, 'Comedy', 'Wanna laugh?');

INSERT INTO User_Table(
	f_name, l_name, userid, zip_code, city, home_state, country, email, birthdate, abotype, bankaccount)
	VALUES ('Marie', 'Sanders', 1, 1234, 'Boston', 'Texas', 'U.S.A.', 'marie@sanders.com', '03.09.1971', 'Test', '5505 8765 9863'),
			('Jack', 'Rhino', 2, 5643, 'Huston', 'Nevada', 'U.S.A.', 'jack@rhino.net', '08.19.1971', 'Normal', '5505 0076 1233'),
			('Tony', 'Stark', 3, 7753, 'Paris', 'Ile de Paris', 'France', 'tony.stark@avengers.com', '11.22.1991', 'Premium', '1123 0854 6466');

INSERT INTO Payment(
	payment_id, userid, "timestamp", act_state)
	VALUES (1, 2, '01.01.2020', true),
			(2, 2, '02.01.2020', false),
			(3, 3, '02.01.2020', true);

INSERT INTO Movies(
	movieid, movielength, moviename, genreid, directorid, actorid, studio, description, agerating)
	VALUES (1, 123, 'Sharknado: The Return', 1, 2, 2, 'Warner Bros', 'Experience the return of the biggest thread to humanity', 12),
			(2, 164, 'Space Quest: The new Hope', 2, 1, 3, 'Disney', 'Only as a Team it will be possible to defeat the death moon.', 16),
			(3, 94, 'Laughing: Out Loud', 3, 3, 1, 'Sony', 'See the Origin of LoL.', 6);

INSERT INTO Watchlist(
	userid, movieid)
	VALUES (1, 1),
			(2, 1),
			(2, 3);
	