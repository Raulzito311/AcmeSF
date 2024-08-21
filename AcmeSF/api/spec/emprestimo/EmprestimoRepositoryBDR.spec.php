<?php
require_once "vendor/autoload.php";

describe('EmprestimoRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves an Emprestimo by id', function() {
        $repo = new EmprestimoRepositoryBDR();
        $emprestimo = $repo->buscarPeloId(1);
        expect($emprestimo)->toBeAnInstanceOf(Emprestimo::class);
    });
    it('retrieves all Emprestimos', function() {
        $repo = new EmprestimoRepositoryBDR();
        $emprestimos = $repo->buscarTodos();
        
        expect($emprestimos)->toBeAn('array');
        expect($emprestimos)->not->toHaveLength(0);
        expect($emprestimos[0])->toBeAnInstanceOf(Emprestimo::class);
    });
    it('adds an Emprestimo', function() { // Não vai aparecer no php my admin pq outros testes foram executados depois e os dados foram apagados
        $repo = new EmprestimoRepositoryBDR();

        $emprestimoDTO = (new EmprestimoDTO())->withClienteId(2)->withFormaDePagamentoId(5)->withValorEmprestimo(10000.00)->withDataHora('2024-04-17 19:32:47');

        $result = $repo->adicionar($emprestimoDTO);
        
        expect($result)->toBeAnInstanceOf(Emprestimo::class);
    });
    it('throws DataException to invalid Cliente foreign key', function() {
        $func = function() {
            $repo = new EmprestimoRepositoryBDR();
            $emprestimoDTO = (new EmprestimoDTO())->withClienteId(200)->withFormaDePagamentoId(5)->withValorEmprestimo(10000.00)->withDataHora('2024-04-17 19:32:47');
            $repo->adicionar($emprestimoDTO);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it('throws DataException to invalid Forma de Pagamento foreign key', function() {
        $func = function() {
            $repo = new EmprestimoRepositoryBDR();
            $emprestimoDTO = (new EmprestimoDTO())->withClienteId(2)->withFormaDePagamentoId(500)->withValorEmprestimo(10000.00)->withDataHora('2024-04-17 19:32:47');
            $repo->adicionar($emprestimoDTO);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it('retrieves Relatorios de Emprestimos', function() {
        $repo = new EmprestimoRepositoryBDR();
        $relatorios = $repo->buscarRelatorio([
            'dataInicio' => '2024-06-01',
            'dataFim' => '2024-07-31'
        ]);
        
        expect($relatorios)->toBeAn('array');
        expect($relatorios)->not->toHaveLength(0);
        expect($relatorios[0])->toBeAnInstanceOf(RelatorioEmprestimos::class);
    });
});
?>