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
        echo 'size = ' . count($emprestimos);
        expect($emprestimos)->toBeAn('array');
        expect($emprestimos)->not->toHaveLength(0);
        expect($emprestimos[0])->toBeAnInstanceOf(Emprestimo::class);
    });
    it('Adiciona um Emprestimo', function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        $repo = new EmprestimoRepositoryBDR();
        $emprestimo = new Emprestimo(3, 2, 5, 1000.00, "2024-04-17 19:32:47");
        $result = $repo->adicionar($emprestimo);
        
        expect($result)->toBeAnInstanceOf(Emprestimo::class);
    });
});
?>