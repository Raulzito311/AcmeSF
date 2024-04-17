<?php

interface EmprestimoRepository{
    function buscarTodos(): array;
    function adicionar(Emprestimo $emprestimo): ?Emprestimo;
}

?>