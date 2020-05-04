from sqlalchemy.orm import sessionmaker
from models import *
from datetime import datetime
import yaml

# change to right directory
import os
os.chdir("/Users/andreasmac/Documents/Github/databases/databasesproject/api")

# create global Session
Session = sessionmaker(bind=engine)

# create local Session
# recreate_database()

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

s.close()