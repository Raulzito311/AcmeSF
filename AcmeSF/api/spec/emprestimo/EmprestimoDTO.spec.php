<?php
require_once "vendor/autoload.php";

describe('EmprestimoDTO', function() {
    it("throws exception on missing cliente", function() {

        $func = function() {
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid cliente", function() {

        $func = function() {
            $cliente = 'invalid';
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on missing formaDePagamento", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid formaDePagamento", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $formaDePagamento = 'invalid';
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on missing cliente->id", function() {

        $func = function() {
            $cliente = new stdClass();
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid cliente->id", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 'invalid';
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on missing formaDePagamento->id", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $formaDePagamento = new stdClass();
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid formaDePagamento->id", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 'invalid';
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on missing valorEmprestimo", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid valorEmprestimo", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 'invalid';
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("doesn't throw exception on valid data", function() {

        $func = function() {
            $cliente = new stdClass();
            $cliente->id = 2;
    
            $formaDePagamento = new stdClass();
            $formaDePagamento->id = 7;
    
            $emprestimo = new stdClass();
            $emprestimo->cliente = $cliente;
            $emprestimo->formaDePagamento = $formaDePagamento;
            $emprestimo->valorEmprestimo = 5999.99;
            $emprestimo->dataHora = '2024/4/15 19:22:46';

            EmprestimoDTO::of($emprestimo);
        };
        
        expect($func)->not->toThrow(new DataException(''));
    });
});
?>