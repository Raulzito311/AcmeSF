<?php

interface FormaDePagamentoRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): FormaDePagamento|bool;
}

?>