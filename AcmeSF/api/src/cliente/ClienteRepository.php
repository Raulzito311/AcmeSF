<?php

interface ClienteRepository{
    function buscarTodos(): array;
    function buscarPeloId($id): Cliente;
}
?>