DELETE FROM formas_de_pagamento; -- WHERE 1;
INSERT INTO formas_de_pagamento 
	(id, descricao, juros, meses) 
    VALUES
    (1, "3 vezes sem juros", 0.00, 3),
    (2, "5 vezes com juros de 10%", 0.10, 5),
    (3, "10 vezes sem juros", 0.00, 10),
    (4, "2 vezes com juros de 5%", 0.05, 2)    