<?php

interface EmprestimoRepository{
    /**
     * @return Emprestimo[]
     */
    function buscarTodos(): array;
    /**
     * @return RelatorioEmprestimos[]
     */
    function buscarRelatorio(array $periodo): array;
    function buscarPeloId(string $id): Emprestimo|false;
    function adicionar(EmprestimoDTO $emprestimo): Emprestimo;
}

?>