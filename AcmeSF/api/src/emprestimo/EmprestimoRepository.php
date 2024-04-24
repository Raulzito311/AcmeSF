<?php

interface EmprestimoRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): Emprestimo|false;
    function adicionar(EmprestimoDTO $emprestimo): Emprestimo|false;
}

?>