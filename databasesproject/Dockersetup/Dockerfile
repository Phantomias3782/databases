# Setup Linux-Envoirement
FROM ubuntu:16.04
 
# Add the PostgreSQL PGP key to verify their Debian packages.
# It should be the same key as https://www.postgresql.org/media/keys/ACCC4CF8.asc
RUN apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8
 
# Add PostgreSQL's repository. It contains the most recent stable release
#     of PostgreSQL, ``9.3``.
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
 
# Install ``python-software-properties``, ``software-properties-common`` and PostgreSQL 9.3 (some red hints will appear)
RUN apt-get update && apt-get install -y python-software-properties software-properties-common postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3

 # Create postgres User; Copy the SQL-script.sql into the container and change the WORKDIR
USER postgres
# COPY ./SQL-script.sql /app/SQL-script.sql
# COPY ./car_dealer.tar /app/car_dealer.tar
# COPY ./data/* /app/
WORKDIR /app
 
# Create a PostgreSQL role and database
RUN    /etc/init.d/postgresql start &&\
    psql --command "CREATE USER postgresondocker WITH SUPERUSER PASSWORD 'postgresondocker';" &&\
    createdb -O postgresondocker Testing

# # Adjust PostgreSQL configuration so that remote connections to the database are possible.
RUN echo "host all  all 0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf
 
# And add ``listen_addresses`` to ``/etc/postgresql/9.3/main/postgresql.conf``
RUN echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf
 
# Expose the PostgreSQL port
EXPOSE 5432
 
# Add VOLUMEs to allow backup of config, logs and databases
VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql"]
 
# Set the default command to run when starting the container
CMD ["/usr/lib/postgresql/9.3/bin/postgres", "-D", "/var/lib/postgresql/9.3/main", "-c", "config_file=/etc/postgresql/9.3/main/postgresql.conf"]