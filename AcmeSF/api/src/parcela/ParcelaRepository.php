<?php

interface ParcelaRepository{
    /**
     * @return Parcela[]
     */
    function buscarParcelasDoEmprestimo(int $emprestimoId): array;
    function pagarParcela(Parcela $parcela): Parcela|false;
    /**
     * @param Parcela[] $parcela
     * 
     * @return Parcela[]
     */
    function adicionarParcelas(array $parcelas): array|false;
}

?>