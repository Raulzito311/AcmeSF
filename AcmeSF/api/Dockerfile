FROM composer AS builder

WORKDIR /api

COPY ./src ./src
COPY ./*.sql .
COPY ./index.php .
COPY ./composer.* .

RUN composer install
RUN composer dump-autoload

FROM php:alpine

RUN docker-php-ext-install mysqli pdo pdo_mysql

WORKDIR /var/www

COPY --from=builder /api .

EXPOSE 8080

CMD php -S 0.0.0.0:8080