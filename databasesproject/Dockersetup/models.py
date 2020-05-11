from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.orm import backref

from config import DATABASE_URI 

Base = declarative_base()

movie_actors_association_table = Table('association', Base.metadata,
Column('MovieID', Integer, ForeignKey('movies.MovieID')),
Column('ActorID', Integer, ForeignKey('actors.ActorID')))

movie_genre_association_table = Table('association2', Base.metadata,
Column('MovieID', Integer, ForeignKey('movies.MovieID')),
Column('GenreID', Integer, ForeignKey('genre.GenreID')))

movie_watchlist_association_table = Table('association3', Base.metadata,
Column('MovieID', Integer, ForeignKey('movies.MovieID')),
Column('WatchlistID', Integer, ForeignKey('watchlist.WatchlistID')))

# define tables

class User_Table(Base):

    __tablename__ = 'user_table'

    UserID = Column(Integer, primary_key = True)
    FName = Column(String)
    LName = Column(String)
    ZipCode = Column(Integer)
    City = Column(String)
    Home_State = Column(String)
    Country = Column(String)
    eMail = Column(String)
    Birthdate = Column(Date)
    AboType = Column(String)
    BankAccount = Column(String)

    payments = relationship("Payment", backref = "user_table")
    ratings = relationship("Ratings", backref = "user_table")

    watchlist = relationship("Watchlist", uselist = False, back_populates = "user")

    def __repr__(self): #change to dictionary
        return f"User(FName='{self.FName}', LName='{self.LName}', Zip_Code='{self.ZipCode}', City='{self.City}', Home_State='{self.Home_State}', Country='{self.Country}', eMail='{self.eMail}', Birthdate='{self.Birthdate}',  AboType='{self.AboType}', BankAccount='{self.BankAccount}')"

class Payment(Base):

    __tablename__ = "payment"

    Payment_ID = Column(Integer, primary_key = True)
    UserID = Column(Integer, ForeignKey("user_table.UserID")) # foreign key --> google how to in sqa
    TimeStamp = Column(Date)
    ActualState = Column(Boolean)

    # missing repr

class Genre(Base):

    __tablename__ = "genre"

    GenreID = Column(Integer, primary_key = True)
    GenreName = Column(String)
    GenreDescription = Column(String)

    movies = relationship("Movies", secondary = movie_genre_association_table, back_populates = "genres")

    # missing repr

class Actors(Base):

    __tablename__ = "actors"

    ActorID = Column(Integer, primary_key = True)
    ActorName = Column(String)
    Birthdate = Column(Date)

    movies = relationship("Movies", secondary = movie_actors_association_table, back_populates ="actors")

    # missing repr

class Directors(Base):

    __tablename__ = "directors"

    DirectorID = Column(Integer, primary_key = True)
    DirectorName = Column(String)
    Birthdate = Column(Date)
    Movies = relationship("Movies")

    # missing repr

class Movies(Base):

    __tablename__ = "movies"

    MovieID = Column(Integer, primary_key = True)
    MovieLength = Column(Integer)
    MovieName = Column(String)
    #GenreID = Column(Integer)
    #ActorID = Column(Integer, ForeignKey(Actors.ActorID)) # Foreign Key!!
    DirectorID = Column(Integer, ForeignKey("directors.DirectorID"))
    Studio = Column(String)
    Description = Column(String)
    AgeRating = Column(Integer)

    genres = relationship("Genre", secondary = movie_genre_association_table, back_populates = "movies" )
    actors = relationship("Actors", secondary = movie_actors_association_table, back_populates = "movies")
    watchlists = relationship("Watchlist", secondary = movie_watchlist_association_table, back_populates = "movies")
    ratings = relationship("Ratings", backref = "movies")


    # missing repr

class Watchlist(Base):

    __tablename__ = "watchlist"

    WatchlistID = Column(Integer, primary_key = True)
    UserID = Column(Integer, ForeignKey("user_table.UserID"))
    #MovieID = Column(Integer)

    movies = relationship("Movies", secondary = movie_watchlist_association_table, back_populates = "watchlists")
    user = relationship("User_Table", back_populates = "watchlist")

    # missing repr

class Ratings(Base):

    __tablename__ = "ratings"

    RatingID = Column(Integer, primary_key = True)
    UserID = Column(Integer, ForeignKey("user_table.UserID"))
    MovieID = Column(Integer, ForeignKey("movies.MovieID"))
    Rating = Column(Integer)
    TextRating = Column(String)

# connect to database
engine = create_engine(DATABASE_URI)

# create tables

def recreate_database():

    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)