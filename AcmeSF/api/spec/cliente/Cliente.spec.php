<?php
require_once "vendor/autoload.php";

describe('Cliente', function() {
    it("throws exception on invalid id", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 'fdsa';
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid cpf", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = 55;
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid cpf format", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062#148#367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid dataNascimento 1", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = 'testando';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid dataNascimento 2", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-14-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid dataNascimento format", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '03-06-2003';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid email 1", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid email 2", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on invalid email 3", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("doesn't throw exception on valid data", function() {

        $func = function() {
            $cliente = new stdClass();

            $cliente->id = 1;
            $cliente->cpf = '062.148.367-25';
            $cliente->nome = 'Raul Fernandes';
            $cliente->dataNascimento = '2003-06-03';
            $cliente->telefone = '(22) 99717-3345';
            $cliente->email = 'raulmff@gmail.com';
            $cliente->endereco = 'Rua dos Amigos, 123';
            $cliente->limiteCredito = 50000;

            Cliente::ofObj($cliente);
        };
        
        expect($func)->not->toThrow(new DataException(''));
    });
});
?>