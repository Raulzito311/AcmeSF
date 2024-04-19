<?php

interface EmprestimoRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): Emprestimo;
    function adicionar(EmprestimoDTO $emprestimo): Emprestimo;
}

?>