import time
from flask import Flask
from flask import request
from flask_cors import CORS
import psycopg2
import json
from flask import jsonify
import sys
# Make api modules importable
sys.path.append('/Users/andreasmac/Documents/Github/databases/databasesproject/api')
from models import *
from sqlalchemy.orm import sessionmaker
# from crud import * # not neccessary

exec(open("crud.py").read())
print("exectuted crud.py")

engine = create_engine(DATABASE_URI)
Session = sessionmaker(bind=engine)

app = Flask(__name__)
CORS(app)

@app.route('/login', methods = ['POST', 'GET'])
def check_login():

    # get input
    variables = request.get_json()
    password = variables["password"]
    email = variables["email"]

    # get data from database
    s = Session()
    try:

        birthdate = s.query(User_Table).filter_by(eMail = email).first().Birthdate

        if str(password) == str(birthdate):

            response = {"verrified": True}
        
        else:

            response = {"verrified": False}
    
    except Exception:

        response = {"verrified": False}
    
    # close session and return
    s.close()
    return jsonify(response)

@app.route("/deletuser", methods = ['POST', 'GET'])
def deleteuser():

    # get data
    variables = request.get_json()
    email = variables["user"]

    # delete user
    s = Session()
    user = s.query(User_Table).filter_by(eMail = email).first()
    s.delete(user)
    s.commit()

    # close session and return
    s.close()
    response = {"finished": True}
    return jsonify(response)

@app.route("/registration", methods = ['POST','GET'])
def registration():

    # get input
    variables = request.get_json()

    # get data to database
    s = Session()

    # get latest userid
    userid = s.query(func.max(User_Table.UserID)).first()
    userid = userid[0] + 1

    # set new user
    user = User_Table(
        UserID = userid,
        FName = variables["fname"],
        LName = variables["lname"],
        ZipCode = variables["zipcode"],
        City = variables["city"],
        Home_State = variables["homestate"],
        Country = variables["country"],
        eMail = variables["email"],
        Birthdate = variables["birthday"],
        AboType = variables["abotype"],
        BankAccount = variables["bankaccount"]
    )

    # add new user
    s.add(user)
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/alteruserinfo", methods = ['POST', 'GET'])
def alteruserinfo():

    # get input
    variables = request.get_json()

    # nFName = variables["fname"],
    # nLName = variables["lname"],
    # nZipCode = variables["zipcode"],
    # nCity = variables["city"],
    # nHome_State = variables["homestate"],
    # nCountry = variables["country"],
    # neMail = variables["email"],
    # nBirthdate = variables["birthday"],
    # nAboType = variables["abotype"],
    # nBankAccount = variables["bankaccount"]
    # ActiveUser = variables["activeuser"]

    # get user
    s = Session()
    user = s.query(User_Table).filter_by(eMail = variables["activeuser"]).first()

    user.FName = variables["fname"]
    user.LName = variables["lname"]
    user.ZipCode = variables["zipcode"]
    user.City = variables["city"]
    user.Home_State = variables["homestate"]
    user.Country = variables["country"]
    user.neMail = variables["email"]
    user.Birthdate = variables["birthday"]
    user.AboType = variables["abotype"]
    user.BankAccount = variables["bankaccount"]

    # update informations
    # user.FName = nFName
    # user.LName = nLName
    # user.ZipCode = nZipCode
    # user.City = nCity
    # user.Home_State = nHome_State
    # user.Country = nCountry
    # user.neMail = neMail
    # user.Birthdate = nBirthdate
    # user.AboType = nAboType
    # user.BankAccount = nBankAccount

    # upload to database
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)


@app.route("/getuserinfo", methods = ['POST', 'GET'])
def getuserinfo():

    # get user
    variables = request.get_json()
    user = variables["user"]

    # get infos
    s = Session()
    userinfo = s.query(User_Table).filter_by(eMail = user).first()

    # close and return
    userinfo = {"userinfo": {
        "lname": userinfo.LName,
        "fname": userinfo.FName,
        "UserID": userinfo.UserID,
        "BankAccount": userinfo.BankAccount,
        "AboType": userinfo.AboType,
        "eMail": userinfo.eMail,
        "HomeState": userinfo.Home_State,
        "ZipCode": userinfo.ZipCode,
        "Birthdate": str(userinfo.Birthdate),
        "Country": userinfo.Country,
        "City": userinfo.City
    }}
    s.close()
    return jsonify(userinfo)

@app.route("/loadmovielist", methods = ['POST', 'GET'])
def loadmovielist():

    # get movies
    s = Session()
    movies = s.query(Movies.MovieName).all()

    # convert result to list
    movies = [movie[0] for movie in movies]

    # create response
    response = {"movies": movies}

    # close session and return
    s.close()
    return jsonify(response)

@app.route("/loadwatchlist", methods = ['POST', 'GET'])
def loadwatchlist():

    # get input
    variables = request.get_json()
    user = variables["user"]    

    # get data from database
    s = Session()

    watchlist = s.query(User_Table).filter_by(eMail = user).first().watchlist
    watchlist = [movie.MovieName for movie in watchlist.movies]

    response = {"watchlist": watchlist}
    
    # close session and return
    s.close()
    return jsonify(response)

@app.route("/loadgenres", methods = ['Get'])
def loadgenres():

    # get data from database
    s = Session()

    genres = s.query(Genre.GenreName).all()
    genres = [genre[0] for genre in genres]
    response = {"genres": genres}

    # close session and return
    s.close()
    return jsonify(response)

@app.route("/loadactors", methods = ['GET'])
def loadactors():

    # get data from database
    s = Session()

    actors = s.query(Actors.ActorName).all()
    actors = [actor[0] for actor in actors]
    response = {"actors": actors}

    # close session and return
    s.close()
    return jsonify(response)

@app.route("/loaddirectors", methods = ['GET'])
def loaddirectors():

    # get data from database
    s = Session()

    directors = s.query(Directors.DirectorName).all()
    directors = [director[0] for director in directors]
    response = {"directors": directors}

    # close session and return
    s.close()
    return jsonify(response)

@app.route("/newgenre", methods = ['GET', 'POST'])
def newgenre():

    # get input
    variables = request.get_json()

    # get data to database
    s = Session()

    # get latest userid
    genreid = s.query(func.max(Genre.GenreID)).first()
    genreid = genreid[0] + 1

    # set new genre
    genre = Genre(
        GenreID = genreid,
        GenreName = variables["genrename"],
        GenreDescription = variables["genredescription"] 
    )

    # add new user
    s.add(genre)
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/newactor", methods = ['GET', 'POST'])
def newactor():

    # get input
    variables = request.get_json()

    # get data to database
    s = Session()

    # get latest userid
    actorid = s.query(func.max(Actors.ActorID)).first()
    actorid = actorid[0] + 1

    # set new genre
    actor = Actors(
        ActorID = actorid,
        ActorName = variables["actorname"],
        Birthdate = variables["birthday"],
    )

    # add new user
    s.add(actor)
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/newdirector", methods = ['GET', 'POST'])
def newdirector():

    # get input
    variables = request.get_json()

    # get data to database
    s = Session()

    # get latest userid
    directorid = s.query(func.max(Directors.DirectorID)).first()
    directorid = directorid[0] + 1

    # set new genre
    director = Directors(
        DirectorID = directorid,
        DirectorName = variables["directorname"],
        Birthdate = variables["birthday"],
    )

    # add new user
    s.add(director)
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/loadgenredescription", methods = ['POST', 'GET'])
def loadgenredescription():

    # get input
    variables = request.get_json()
    genrename = variables["genrename"]

    # get data to database
    s = Session()

    # get genredescription
    genredescription = s.query(Genre.GenreDescription).filter_by(GenreName = genrename).first()

    # return and close
    response = {"genredescription": genredescription}
    s.close()
    return jsonify(response)

@app.route("/altergenre", methods = ['POST', 'GET'])
def altergenre():

    # get input
    variables = request.get_json()
    ident = variables["genreidentification"]
    name = variables["genrename"]
    description = variables["genredescription"]

    # get data to database
    s = Session()

    # get genre
    genre = s.query(Genre).filter_by(GenreName = ident).first()

    # update genre
    genre.GenreName = name
    genre.GenreDescription = description

    # commit changes
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/loaddirectorbirthdate", methods = ['POST', 'GET'])
def loaddirectorbirthdate():

    # get input
    variables = request.get_json()
    directorname = variables["directorname"]

    # get data to database
    s = Session()

    # get genredescription
    directorbirthday = s.query(Directors.Birthdate).filter_by(DirectorName = directorname).first()

    # return and close
    response = {"birthday": str(directorbirthday[0])}
    s.close()
    return jsonify(response)

@app.route("/alterdirector", methods = ['POST', 'GET'])
def alterdirector():

    # get input
    variables = request.get_json()
    ident = variables["directoridentification"]
    name = variables["directorname"]
    birthday = variables["birthday"]

    # get data to database
    s = Session()

    # get genre
    director = s.query(Directors).filter_by(DirectorName = ident).first()

    # update genre
    director.DirectorName = name
    director.Birthdate = birthday

    # commit changes
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/loadactorbirthdate", methods = ['POST', 'GET'])
def loadactorbirthdate():

    # get input
    variables = request.get_json()
    actorname = variables["actorname"]

    # get data to database
    s = Session()

    # get genredescription
    actorbirthday = s.query(Actors.Birthdate).filter_by(ActorName = actorname).first()

    # return and close
    response = {"birthday": str(actorbirthday[0])}
    s.close()
    return jsonify(response)

@app.route("/alteractor", methods = ['POST', 'GET'])
def alteractor():

    # get input
    variables = request.get_json()
    ident = variables["actoridentification"]
    name = variables["actorname"]
    birthday = variables["birthday"]

    # get data to database
    s = Session()

    # get actor
    actor = s.query(Actors).filter_by(ActorName = ident).first()

    # update actor
    actor.ActorName = name
    actor.Birthdate = birthday

    # commit changes
    s.commit()

    # close session
    response = {"loaded": True}
    s.close()
    return jsonify(response)

@app.route("/deletegenre", methods = ['POST', 'GET'])
def deletegenre():

    # get data
    variables = request.get_json()
    genre = variables["genre"]

    # delete user
    s = Session()
    genre = s.query(Genre).filter_by(GenreName = genre).first()
    s.delete(genre)
    s.commit()

    # close session and return
    s.close()
    response = {"finished": True}
    return jsonify(response)

@app.route("/deletedirector", methods = ['POST', 'GET'])
def deletedirector():
    
    # get data
    variables = request.get_json()
    director = variables["director"]

    # delete user
    s = Session()
    director = s.query(Directors).filter_by(DirectorName = director).first()
    s.delete(director)
    s.commit()

    # close session and return
    s.close()
    response = {"finished": True}
    return jsonify(response)

@app.route("/deleteactor", methods = ['POST', 'GET'])
def deleteactor():
    
    # get data
    variables = request.get_json()
    actor = variables["actor"]
    print("execute delete actor:", actor)

    # delete user
    s = Session()
    actor = s.query(Actors).filter_by(ActorName = actor).first()
    s.delete(actor)
    s.commit()

    # close session and return
    s.close()
    response = {"finished": True}
    return jsonify(response)

@app.route("/loadspecmovie", methods = ['POST', 'GET'])
def loadspecmovie():

    # get movie
    variables = request.get_json()
    movie = variables["movie"]

    # get movie data
    s = Session()
    moviedata = s.query(Movies).filter_by(MovieName = movie).first()

    movieid = moviedata.MovieID
    movielength = moviedata.MovieLength
    moviename = moviedata.MovieName
    directorid = moviedata.DirectorID
    studio = moviedata.Studio
    description = moviedata.Description
    agerating = moviedata.AgeRating
    actors = [actor.ActorName + ", " for actor in moviedata.actors]
    genre = [genre.GenreName + ", " for genre in moviedata.genres]

    # Delete last commata
    actors[-1] = actors[-1][:-2]
    genre[-1] = genre[-1][:-2]

    # ratings = moviedata.ratings

    directorname = s.query(Directors.DirectorName).filter_by(DirectorID = directorid).all()

    ratings = [{"rating": rating.Rating, "text": rating.TextRating} for rating in moviedata.ratings]

    # build response
    response = {
        "movielength": movielength,
        "moviename": moviename,
        "genre": genre,
        "actors": actors,
        "director": directorname,
        "studio": studio,
        "description": description,
        "agerating": agerating,
        "ratings": ratings 
    }

    # close session and retrun
    s.close()
    return jsonify(response)

@app.route("/ratemovie", methods = ['GET', 'POST'])
def ratemovie():
    
    # get variables
    variables = request.get_json()

    # get user and movieid
    s = Session()
    userid = s.query(User_Table.UserID).filter_by(eMail = variables["user"]).first()
    movieid = s.query(Movies.MovieID).filter_by(MovieName = variables["movie"]).first()

    # get latest ratingid
    ratingid = s.query(func.max(Ratings.RatingID)).first()
    ratingid = ratingid[0] + 1

    # set new genre
    rating = Ratings(
        RatingID = ratingid,
        UserID = userid,
        MovieID = movieid,
        Rating = variables["rating"],
        TextRating = variables["textrating"]
    )

    # add new user
    s.add(rating)
    s.commit()

    # close Session and return
    s.close()
    response = {"loaded": True}

    return jsonify(response)

@app.route("/addtowatchlist", methods = ['POST', 'GET'])
def addtowatchlist():

    variables = request.get_json()

    # get data
    s = Session()
    movie = s.query(Movies).filter_by(MovieName = variables["movie"]).first()
    userid = s.query(User_Table.UserID).filter_by(eMail = variables["user"]).first()

    watchlist = s.query(Watchlist).filter_by(UserID = userid).first()

    if str(type(watchlist)) == "<class 'NoneType'>":

        latestwatchlist = s.query(func.max(Watchlist.WatchlistID)).first()
        latestwatchlist = latestwatchlist[0] + 1
        watchlist = Watchlist(
            WatchlistID = latestwatchlist,
            UserID = userid
        )
    else:
        print("no", type(watchlist))

    # append movie to watchlist
    watchlist.movies.append(movie)
    s.commit()

    # return and close
    s.close()
    response = {"loading": True}

    return jsonify(response)

@app.route("/newmovie", methods = ['GET', 'POST'])
def newmovie():

    # get input
    variables = request.get_json()

    # open session and create new movie
    s = Session()

    movieid = s.query(func.max(Movies.MovieID)).first()
    movieid = movieid[0] + 1

    directorid = s.query(Directors.DirectorID).filter_by(DirectorName = variables["director"]).first()

    movie = Movies(
        MovieID = movieid,
        MovieLength = variables["length"],
        MovieName = variables["name"],
        DirectorID = directorid,
        Studio = variables["studio"],
        Description = variables["description"],
        AgeRating = variables["agerating"]
    )
    s.commit()

    # add genres
    for element in variables["genre"]:
        genre = s.query(Genre).filter_by(GenreName = element).first()
        movie.genres.append(genre)

    # add actors
    for element in variables["actors"]:
        genre = s.query(Actors).filter_by(ActorName = element).first()
        movie.actors.append(genre)
    s.commit()

    # return and close
    s.close()
    response = {"loading": True}

    return jsonify(response)

@app.route("/deletefromwatchlist", methods = ['GET', 'POST'])
def deletefromwatchlist():

    # get movie and user
    variables = request.get_json()

    # get watchlist
    s = Session()

    userid = s.query(User_Table.UserID).filter_by(eMail = variables["user"]).first()
    watchlist = s.query(Watchlist).filter_by(UserID = userid).first()
    movie = s.query(Movies).filter_by(MovieName = variables["movie"]).first()

    if movie in watchlist.movies:
        watchlist.movies.remove(movie)
    s.commit()

    # close and return
    s.close()
    response = {"loading": True}

    return jsonify(response)


@app.route("/test", methods = ['GET'])
def test():
    #Encoder
    s = Session()

    movie = s.query(Movies).filter_by(MovieID = 1).first()
    print("actors", movie.actors)
    print(type(movie.actors))
    for actor in movie.actors:
        print(actor.ActorName)
    #movie.actors = json.dumps(movie.actors, cls = AlchemyEncoder)
    return json.dumps(movie, cls=AlchemyEncoder)

from sqlalchemy.ext.declarative import DeclarativeMeta

class AlchemyEncoder(json.JSONEncoder):


    def default(self, obj):
        if isinstance(obj.__class__, DeclarativeMeta):
            # an SQLAlchemy class
            fields = {}
            for field in [x for x in dir(obj) if not x.startswith('_') and x != 'metadata']:
                data = obj.__getattribute__(field)
                try:
                    json.dumps(data) # this will fail on non-encodable values, like other classes
                    fields[field] = data
                except TypeError:
                    fields[field] = None
            # a json-encodable dict
            return fields

        return json.JSONEncoder.default(self, obj)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')