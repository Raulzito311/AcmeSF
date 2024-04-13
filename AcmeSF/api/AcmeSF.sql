CREATE TABLE formas_de_pagamento(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descricao varchar(100) NOT NULL,
    meses int NOT NULL,
    juros decimal(10,2) NOT NULL
) ENGINE=INNODB;

CREATE TABLE clientes(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cpf varchar(11) NOT NULL,
    nome varchar(100) NOT NULL,
    dataNascimento Datetime NOT NULL
) ENGINE=INNODB;