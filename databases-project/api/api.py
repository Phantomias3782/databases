import time
from flask import Flask
from flask import request
from flask_cors import CORS
import psycopg2
import json

app = Flask(__name__)
CORS(app)

def open_connection():
    """ Connects to Database and returns cursor and connection. """
    
    connection = psycopg2.connect(user = "postgres",
                                  password = "Daenerys1",
                                  host = "127.0.0.1",
                                  port = "5432",
                                  database = "StreamingService")
    
    cursor = connection.cursor()
    
    print("PostgreSQL connection is opened.")
    
    return cursor, connection

def close_connection(cursor, connection):
    """ CLoses Database connection. """
    
    cursor.close()
    connection.close()
    print("PostgreSQL connection is closed.")



@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/login', methods = ['POST', 'GET'])
def check_login():
    
    # save input
    variables = request.get_json()
    password = variables["password"]
    email = variables["email"]

    # connect to database
    cursor, connection = open_connection()

    # verify
    cursor.execute(f"SELECT birthdate FROM user_table WHERE email = '{email}'")

    pwd = cursor.fetchall()
    
    # check if user exists
    if pwd != []:
        # check if pwds correspond
        if pwd == password:
            return json.dumps(True)
        else:
            return json.dumps(False)
    else:
        return json.dumps(False)