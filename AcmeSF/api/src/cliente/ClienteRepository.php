<?php
interface ClienteRepository{
    /**
     * @return Cliente[]
     */
    function buscarTodos(): array;
    function buscarPeloId(string $id): Cliente|false;
    function buscarPeloCPF(string $cpf): Cliente|false;
}
?>