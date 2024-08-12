<?php
require_once "vendor/autoload.php";

describe('Credenciais', function() {
    it("throws exception on missing login", function() {

        $func = function() {
            $credenciais = new stdClass();

            $credenciais->senha = '123456';

            Credenciais::of($credenciais);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("throws exception on missing senha", function() {

        $func = function() {
            $credenciais = new stdClass();

            $credenciais->login = 'raul';

            Credenciais::of($credenciais);
        };
        
        expect($func)->toThrow(new DataException(''));
    });
    it("doesn't throw exception on valid data", function() {

        $func = function() {
            $credenciais = new stdClass();

            $credenciais->login = 'raul';
            $credenciais->senha = '123456';

            Credenciais::of($credenciais);
        };
        
        expect($func)->not->toThrow(new DataException(''));
    });
});
?>