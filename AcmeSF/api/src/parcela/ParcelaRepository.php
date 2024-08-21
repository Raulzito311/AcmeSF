<?php

interface ParcelaRepository{
    function buscarParcelaParaPagar(int $emprestimoId): Parcela|false;
    /**
     * @return Parcela[]
     */
    function buscarParcelasDoEmprestimo(int $emprestimoId): array;
    function pagarParcela(int $usuarioPagamentoId, int $parcelaId): bool;
    /**
     * @param Parcela[] $parcela
     * 
     * @return Parcela[]
     */
    function adicionarParcelas(array $parcelas): void;
}

?>