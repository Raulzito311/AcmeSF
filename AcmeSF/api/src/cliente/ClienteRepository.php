<?php
interface ClienteRepository{
    /**
     * @return Cliente[]
     */
    function buscarTodos(): array;
    function buscarPeloId(int $id): Cliente|false;
    function buscarPeloCPF(string $cpf): Cliente|false;
    function adicionar(Cliente $cliente): void;
    function ajustarLimiteDoClienteDoEmprestimo(float $valor, int $emprestimoId): void;
}
?>