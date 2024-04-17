CREATE DATABASE acmesf CHARACTER SET utf8 COLLATE utf8_general_ci;

USE acmesf;

CREATE TABLE formas_de_pagamento(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    descricao varchar(100) NOT NULL,
    meses int NOT NULL,
    juros decimal(5,4) NOT NULL
) ENGINE=INNODB;

CREATE TABLE clientes(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    cpf varchar(14) NOT NULL,
    nome varchar(100) NOT NULL,
    dataNascimento date NOT NULL
) ENGINE=INNODB;

CREATE TABLE emprestimos(
    id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    clienteId int NOT NULL,
    formaDePagamentoId int NOT NULL,
    valorEmprestimo decimal(10,2) NOT NULL,
    dataHora datetime NOT NULL,
    CONSTRAINT fk__emprestimo_cliente FOREIGN KEY (clienteId) REFERENCES clientes(id),
    CONSTRAINT fk__emprestimo_formaDePagamento FOREIGN KEY (formaDePagamentoId) REFERENCES formas_de_pagamento(id)
) ENGINE=INNODB;