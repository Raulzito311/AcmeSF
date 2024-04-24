<?php

use phputil\router\FakeHttpRequest;
use phputil\router\FakeHttpResponse;

require_once "vendor/autoload.php";

describe('ClienteController', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves all Clientes', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/clientes');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();
    });
    it('retrieves one Cliente by id', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/clientes/1');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();

        $cliente = json_decode($resObj->body[0]);

        expect($cliente->id)->toBe(1);
        expect($cliente->nome)->toBe('Rodrigo Jorge');
        expect($cliente->cpf)->toBe('063.556.107-74');
        expect($cliente->dataNascimento)->toBe('2003-02-12');
    });
    it('returns status "404 - Not Found" for an inexistant Cliente id', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/clientes/999');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(404))->toBeTruthy();
    });
    it('retrieves one Cliente by CPF', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/clientes?cpf=063.556.107-74');
        $req->withParams(['cpf' => '063.556.107-74']);
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();

        $cliente = json_decode($resObj->body[0]);

        expect($cliente->id)->toBe(1);
        expect($cliente->nome)->toBe('Rodrigo Jorge');
        expect($cliente->cpf)->toBe('063.556.107-74');
        expect($cliente->dataNascimento)->toBe('2003-02-12');
    });
    it('returns status "404 - Not Found" for an inexistant Cliente CPF', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/clientes?cpf=093.221.320-00');
        $req->withParams(['cpf' => '093.221.320-00']);
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(404))->toBeTruthy();
    });
});

?>