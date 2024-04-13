DELETE FROM formas_de_pagamento; -- WHERE 1;
INSERT INTO formas_de_pagamento 
	(id, descricao, juros, meses) 
    VALUES
    (1, "3 vezes sem juros", 0.00, 3),
    (2, "5 vezes com juros de 10%", 0.10, 5),
    (3, "10 vezes sem juros", 0.00, 10),
    (4, "2 vezes com juros de 5%", 0.05, 2);

DELETE FROM clientes; -- WHERE 1;
INSERT INTO clientes 
	(id, cpf, nome, dataNascimento) 
    VALUES
    (1, "12345678910", "Rodrigo Jorge", "2003-02-12 00:00:00"),
    (2, "10987654321", "Raul Fernandes", "2002-05-15 00:00:00"),
    (3, "54321678910", "Thiago Delgado", "1995-06-22 00:00:00");

   