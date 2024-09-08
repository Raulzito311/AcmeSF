FROM mysql

ENV MYSQL_ROOT_PASSWORD=root

COPY ./AcmeSF.sql /docker-entrypoint-initdb.d/
COPY ./dados.sql /docker-entrypoint-initdb.d/

