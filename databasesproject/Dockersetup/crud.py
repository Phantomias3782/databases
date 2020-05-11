from sqlalchemy.orm import sessionmaker
from models import *
from datetime import datetime
import yaml

# change to right directory
# import os # oucommentet for docker
# os.chdir("/Users/andreasmac/Documents/Github/databases/databasesproject/api") # oucommentet for docker

# create global Session
Session = sessionmaker(bind=engine)

# create local Session

s = Session()

recreate_database()

for data in yaml.load_all(open("./Data/users.yaml")):
    user = User_Table(**data)
    s.add(user)

s.commit()

for data in yaml.load_all(open("./Data/actors.yaml")):
    actor = Actors(**data)
    s.add(actor)

s.commit()

for data in yaml.load_all(open("./Data/directors.yaml")):
    director = Directors(**data)
    s.add(director)

s.commit()

for data in yaml.load_all(open("./Data/genres.yaml")):
    genre = Genre(**data)
    s.add(genre)

s.commit()

for data in yaml.load_all(open("./Data/movies.yaml")):
    movie = Movies(**data)
    s.add(movie)

s.commit()

for data in yaml.load_all(open("./Data/payments.yaml")):
    payment = Payment(**data)
    s.add(payment)

s.commit()

for data in yaml.load_all(open("./Data/ratings.yaml")):
    rating = Ratings(**data)
    s.add(rating)

s.commit()

for data in yaml.load_all(open("./Data/watchlists.yaml")):
    watchlist = Watchlist(**data)
    s.add(watchlist)

s.commit()

# add many to many relations
movie = s.query(Movies).filter_by(MovieID = 1).first()
genre_1 = s.query(Genre).filter_by(GenreID = 1).first()
genre_2 = s.query(Genre).filter_by(GenreID = 3).first()
actor1 = s.query(Actors).filter_by(ActorID = 1).first()
actor2 = s.query(Actors).filter_by(ActorID = 5).first()
watchlist1 = s.query(Watchlist).filter_by(WatchlistID = 1).first()
watchlist2 = s.query(Watchlist).filter_by(WatchlistID = 3).first()
movie.actors.append(actor1)
movie.actors.append(actor2)
movie.genres.append(genre_1)
movie.genres.append(genre_2)
watchlist1.movies.append(movie)
watchlist2.movies.append(movie)
s.commit()

movie = s.query(Movies).filter_by(MovieID = 2).first()
genre_1 = s.query(Genre).filter_by(GenreID = 2).first()
actor1 = s.query(Actors).filter_by(ActorID = 3).first()
actor2 = s.query(Actors).filter_by(ActorID = 4).first()
actor3 = s.query(Actors).filter_by(ActorID = 6).first()
watchlist1 = s.query(Watchlist).filter_by(WatchlistID = 1).first()
watchlist2 = s.query(Watchlist).filter_by(WatchlistID = 2).first()
movie.actors.append(actor1)
movie.actors.append(actor2)
movie.actors.append(actor3)
movie.genres.append(genre_1)
watchlist1.movies.append(movie)
watchlist2.movies.append(movie)
s.commit()

movie = s.query(Movies).filter_by(MovieID = 3).first()
genre_1 = s.query(Genre).filter_by(GenreID = 3).first()
genre_2 = s.query(Genre).filter_by(GenreID = 2).first()
actor1 = s.query(Actors).filter_by(ActorID = 1).first()
watchlist1 = s.query(Watchlist).filter_by(WatchlistID = 1).first()
watchlist2 = s.query(Watchlist).filter_by(WatchlistID = 3).first()
movie.actors.append(actor1)
movie.genres.append(genre_1)
movie.genres.append(genre_2)
watchlist1.movies.append(movie)
watchlist2.movies.append(movie)
s.commit()

movie = s.query(Movies).filter_by(MovieID = 4).first()
genre_1 = s.query(Genre).filter_by(GenreID = 1).first()
genre_2 = s.query(Genre).filter_by(GenreID = 3).first()
genre_3 = s.query(Genre).filter_by(GenreID = 2).first()
actor1 = s.query(Actors).filter_by(ActorID = 2).first()
actor2 = s.query(Actors).filter_by(ActorID = 6).first()
watchlist1 = s.query(Watchlist).filter_by(WatchlistID = 2).first()
watchlist2 = s.query(Watchlist).filter_by(WatchlistID = 3).first()
watchlist3 = s.query(Watchlist).filter_by(WatchlistID = 1).first()
movie.actors.append(actor1)
movie.actors.append(actor2)
movie.genres.append(genre_1)
movie.genres.append(genre_2)
movie.genres.append(genre_3)
watchlist1.movies.append(movie)
watchlist2.movies.append(movie)
watchlist3.movies.append(movie)
s.commit()

s.close()