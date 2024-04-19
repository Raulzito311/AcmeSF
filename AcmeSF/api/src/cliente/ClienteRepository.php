<?php
interface ClienteRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): ?Cliente;
    function buscarPeloCPF($cpf): ?Cliente;
}
?>