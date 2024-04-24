<?php
interface ClienteRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): Cliente|false;
    function buscarPeloCPF($cpf): Cliente|false;
}
?>