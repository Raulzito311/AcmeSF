USE acmesf;
DELETE FROM parcela; -- WHERE 1;
DELETE FROM emprestimo; -- WHERE 1;
DELETE FROM cliente; -- WHERE 1;
DELETE FROM forma_de_pagamento; -- WHERE 1;
DELETE FROM usuario; -- WHERE 1;

INSERT INTO usuario 
	(id, nome, username, email, senha, sal, permissao) 
    VALUES
    (1, "Raul Fernandes", "raul", "raulmff@gmail.com", "8f7ddbbd6cd52be44252d1d27470fcb8aa0e6bc492b311f23248c7d421c6ce06", "B#z7&bK5Vdk-zFVb_@+#", "P"),
    (2, "Gerente", "admin", "admin@gmail.com", "be8b217cfcc99f6d0dd78e5c13f25b243bd4f2fa46392d09a9268b2f3573d5d0", "6-kQ3Q-&pw9Rc#WEnw4v", "G");

INSERT INTO forma_de_pagamento 
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

INSERT INTO cliente 
	(id, cpf, nome, dataNascimento, telefone, email, endereco, limiteCredito) 
    VALUES
    (1, "062.148.367-25", "Raul Fernandes", "2003-03-06", "(22) 99717-3345", "raulmff@gmail.com", "Rua dos Amigos, 123 | Nova Friburgo - RJ", 43333.34),
    (2, "182.198.228-21", "Jheniffer Fournier", "1999-06-24", "(21) 99834-0276", "jhey@gmail.com", "Rua da Família, 321 | Ubatuba - SP", 38999.75);

INSERT INTO emprestimo 
	(id, clienteId, formaDePagamentoId, valorEmprestimo, dataHora) 
    VALUES
    (1, 2, 2, 3000.00, "2024-07-15 19:22:46"),
    (2, 1, 3, 10000.00, "2024-07-22 08:57:37");

INSERT INTO parcela 
	(id, emprestimoId, valor, paga, dataVencimento) 
    VALUES
    (2, 1, 1537.50, 0, "2024-09-15"),
    (4, 2, 3500.00, 0, "2024-09-22"),
    (5, 2, 3500.00, 0, "2024-10-22");

INSERT INTO parcela 
	(id, emprestimoId, valor, paga, dataVencimento, dataHoraPagamento, usuarioPagamentoId) 
    VALUES
    (1, 1, 1537.50, 1, "2024-08-15", "2024-08-07 22:15:07", 1),
    (3, 2, 3500.00, 1, "2024-08-22", "2024-08-15 10:07:00", 2);
