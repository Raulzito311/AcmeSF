USE acmesf;
DELETE FROM emprestimos; -- WHERE 1;
DELETE FROM clientes; -- WHERE 1;
DELETE FROM formas_de_pagamento; -- WHERE 1;

INSERT INTO formas_de_pagamento 
	(id, descricao, meses, juros) 
    VALUES
    (1,  "1 vez",  1,  0.025),
    (2,  "2 vezes",  2,  0.025),
    (3,  "3 vezes",  3,  0.05),
    (4,  "4 vezes",  4,  0.05),
    (5,  "5 vezes",  5,  0.075),
    (6,  "6 vezes",  6,  0.075),
    (7,  "7 vezes",  7,  0.1),
    (8,  "8 vezes",  8,  0.1),
    (9,  "9 vezes",  9,  0.125),
    (10, "10 vezes", 10, 0.125),
    (11, "11 vezes", 11, 0.15),
    (12, "12 vezes", 12, 0.15);

INSERT INTO clientes 
	(id, cpf, nome, dataNascimento) 
    VALUES
    (1, "123.456.789-10", "Rodrigo Jorge", "2003-02-12"),
    (2, "062.148.367-25", "Raul Fernandes", "2003-03-06"),
    (3, "543.216.789-10", "Thiago Delgado", "1990-06-22");

INSERT INTO emprestimos 
	(id, clienteId, formaDePagamentoId, valorEmprestimo, dataHora) 
    VALUES
    (1, 3, 7, 2000.00, "2024-04-15 19:22:46"),
    (2, 1, 10, 7549.98, "2024-01-22 08:57:37");
