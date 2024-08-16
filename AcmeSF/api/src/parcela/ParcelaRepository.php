<?php

interface ParcelaRepository{
    /**
     * @return Parcela[]
     */
    function buscarParcelasDoEmprestimo(int $emprestimoId): array;
    function pagarParcela(int $usuarioPagamentoId, int $emprestimoId): bool;
    /**
     * @param Parcela[] $parcela
     * 
     * @return Parcela[]
     */
    function adicionarParcelas(array $parcelas): array|false;
}

?>