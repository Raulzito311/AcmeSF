<?php
interface ClienteRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): Cliente|bool;
    function buscarPeloCPF($cpf): Cliente|bool;
}
?>