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
    (1, "12345678910", "Rodrigo Jorge", "12/02/2003"),
    (2, "10987654321", "Raul Fernandes", "15/05/2002"),
    (3, "54321678910", "Thiago Delgado", "22/06/1995"),

   