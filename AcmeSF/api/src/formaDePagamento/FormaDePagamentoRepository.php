<?php

interface FormaDePagamentoRepository{
    /**
     * @return FormaDePagamento[]
     */
    function buscarTodos(): array;
    function buscarPeloId(string $id): FormaDePagamento|false;
}

?>