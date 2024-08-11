CREATE DATABASE acmesf CHARACTER SET utf8 COLLATE utf8_general_ci;

USE acmesf;

CREATE TABLE forma_de_pagamento(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descricao varchar(255) NOT NULL,
    meses int NOT NULL,
    juros decimal(5,4) NOT NULL
) ENGINE=INNODB;

CREATE TABLE cliente(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cpf char(14) NOT NULL,
    nome varchar(255) NOT NULL,
    dataNascimento date NOT NULL,
    telefone varchar(30) NOT NULL,
    email varchar(255) NOT NULL,
    endereco varchar(255) NOT NULL,
    limiteCredito varchar(255) NOT NULL
) ENGINE=INNODB;

CREATE TABLE emprestimo(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    clienteId int NOT NULL,
    formaDePagamentoId int NOT NULL,
    valorEmprestimo decimal(10,2) NOT NULL,
    dataHora datetime NOT NULL,
    CONSTRAINT fk__emprestimo_cliente FOREIGN KEY (clienteId) REFERENCES cliente(id),
    CONSTRAINT fk__emprestimo_formaDePagamento FOREIGN KEY (formaDePagamentoId) REFERENCES forma_de_pagamento(id)
) ENGINE=INNODB;

CREATE TABLE usuario(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nome varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    senha varchar(255) NOT NULL,
    permissao char(1) NOT NULL
) ENGINE=INNODB;