<?php
require_once "vendor/autoload.php";

describe('EmprestimoRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('Carrega um Emprestimo pelo id', function() {
        $repo = new EmprestimoRepositoryBDR();
        $emprestimo = $repo->buscarPeloId(1);
        expect($emprestimo)->toBeAnInstanceOf(Emprestimo::class);
    });
    it('Carrega todos os Emprestimos', function() {
        $repo = new EmprestimoRepositoryBDR();
        $emprestimos = $repo->buscarTodos();
        
        expect($emprestimos)->toBeAn('array');
        expect($emprestimos)->not->toHaveLength(0);
        expect($emprestimos[0])->toBeAnInstanceOf(Emprestimo::class);
    });
    it('Adiciona um Emprestimo', function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        $repo = new EmprestimoRepositoryBDR();

        $emprestimoDTO = (new EmprestimoDTO())->withClienteId(2)->withFormaDePagamentoId(5)->withValorEmprestimo(10000.00)->withDataHora('2024-04-17 19:32:47');

        $result = $repo->adicionar($emprestimoDTO);
        
        expect($result)->toBeAnInstanceOf(Emprestimo::class);
    });
});
?>