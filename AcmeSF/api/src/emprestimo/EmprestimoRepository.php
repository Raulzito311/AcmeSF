<?php

interface EmprestimoRepository{
    /**
     * @return Emprestimo[]
     */
    function buscarTodos(): array;
    function buscarRelatorio(array $periodo): array;
    function buscarPeloId(string $id): Emprestimo|false;
    function adicionar(EmprestimoDTO $emprestimo): Emprestimo;
}

?>