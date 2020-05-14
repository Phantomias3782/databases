# Setup Linux-Envoirement
# FROM ubuntu:16.04
FROM python:3.7.5-slim

# install pip, python, libpq
RUN apt-get update -y && \
     apt-get install -y python-pip python-dev libpq-dev

# Copy the requirements to the containter and change WORKDIR
COPY . /app
WORKDIR /app

# Install all python-libaries from requirements.txt
RUN pip install -r requirements.txt

# Set the startingpoint for the container
CMD [ "python", "./crud.py" ]
ENTRYPOINT [ "python" ]

# create database

# start backend
CMD ["api.py" ]