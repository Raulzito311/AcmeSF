<?php
require_once "vendor/autoload.php";

describe('ClienteRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves Cliente by id', function() {
        $repo = new ClienteRepositoryBDR();
        $cliente = $repo->buscarPeloId(1);
        expect($cliente)->toBeAnInstanceOf(Cliente::class);
    });
    it('retrieves all Clientes', function() {
        $repo = new ClienteRepositoryBDR();
        $clientes = $repo->buscarTodos();
        expect($clientes)->toBeAn('array');
        expect($clientes[0])->toBeAnInstanceOf(Cliente::class);
    });
    it('retrieves Cliente by CPF', function() {
        $repo = new ClienteRepositoryBDR();
        $cliente = $repo->buscarPeloCPF('062.148.367-25');
        expect($cliente)->toBeAnInstanceOf(Cliente::class);
    });
    it("adds a Cliente", function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        
        $func = function() {
            $repo = new ClienteRepositoryBDR();

            $cliente = (new Cliente())->withCpf('123.456.789-09')->withNome('Teste Back')->withDataNascimento('1990-04-17')->withTelefone('(22) 99717-3346')->withEmail('teste@email.com')->withEndereco('Rua dos testes')->withLimiteCredito(10000)->withLimiteCreditoMaximo(10000);

            $repo->adicionar($cliente);
        };
        
        expect($func)->not->toThrow(new Exception(''));
    });
    it("changes Cliente's limit", function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        
        $repo = new ClienteRepositoryBDR();

        $clienteBefore1 = $repo->buscarPeloId(1);

        $repo->ajustarLimiteDoClienteDoEmprestimo(-1000, 1);

        $clienteAfter1 = $repo->buscarPeloId(1);
        
        expect($clienteAfter1->limiteCredito)->toBe($clienteBefore1->limiteCredito - 1000);

        $clienteBefore2 = $repo->buscarPeloId(1);

        $repo->ajustarLimiteDoClienteDoEmprestimo(1000, 1);

        $clienteAfter2 = $repo->buscarPeloId(1);
        
        expect($clienteAfter2->limiteCredito)->toBe($clienteBefore2->limiteCredito  + 1000);
    });
    it("throws DataException when changing Cliente's limit to negative", function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        
        $func = function() {
            $repo = new ClienteRepositoryBDR();

            $repo->ajustarLimiteDoClienteDoEmprestimo(-100000, 1);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
});
?>