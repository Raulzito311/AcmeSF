<?php

interface EmprestimoRepository{
    /**
     * @return Emprestimo[]
     */
    function buscarTodos(): array;
    function buscarPeloId(string $id): Emprestimo|false;
    function adicionar(EmprestimoDTO $emprestimo): Emprestimo;
}

?>