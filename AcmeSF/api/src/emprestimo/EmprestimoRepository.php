<?php

interface EmprestimoRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): Emprestimo|bool;
    function adicionar(EmprestimoDTO $emprestimo): Emprestimo|bool;
}

?>