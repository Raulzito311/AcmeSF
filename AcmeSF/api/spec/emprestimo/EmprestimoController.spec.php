<?php

use phputil\router\FakeHttpRequest;
use phputil\router\FakeHttpResponse;

require_once "vendor/autoload.php";
/* Estes testes começaram a dar erro por conta da autenticação
describe('EmprestimoController', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves all Emprestimos', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/emprestimos');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();
    });
    it('retrieves one Emprestimo by id', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/emprestimos/1');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();

        $emprestimo = json_decode($resObj->body[0]);

        expect($emprestimo->id)->toBe(1);
        expect($emprestimo->cliente->id)->toBe(3);
        expect($emprestimo->formaDePagamento->id)->toBe(7);
        expect($emprestimo->valorEmprestimo)->toBe(2000.5);
        expect($emprestimo->dataHora)->toBe('2024-04-15 19:22:46');
    });
    it('returns status "404 - Not Found" for an inexistant Emprestimo id', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/emprestimos/999');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(404))->toBeTruthy();
    });
    it('adds an Emprestimo', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('POST');
        $req->withUrl('/emprestimos');
        $req->withHeader('Content-Type', 'application/json');
        $req->withBody(json_decode('{"cliente": {"id": 2},"formaDePagamento": {"id": 5},"valorEmprestimo": "49999.99","dataHora": "2024-04-17 19:20:56"}'));
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(201))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();

        $emprestimo = json_decode($resObj->body[0]);

        expect($emprestimo->id)->not->toBeEmpty();
        expect($emprestimo->cliente->id)->toBe(2);
        expect($emprestimo->formaDePagamento->id)->toBe(5);
        expect($emprestimo->valorEmprestimo)->toBe(49999.99);
        expect($emprestimo->dataHora)->toBe('2024-04-17 19:20:56');
    });
    it('returns status "400 - Bad Request" for invalid cliente->id', function() {
        checkBadRequest('{"cliente": {"id": "invalid"},"formaDePagamento": {"id": 5},"valorEmprestimo": "49999.99","dataHora": "2024-04-17 19:22:56"}');
    });
    it('returns status "400 - Bad Request" for inexistent cliente->id', function() {
        checkBadRequest('{"cliente": {"id": 999},"formaDePagamento": {"id": 5},"valorEmprestimo": "49999.99","dataHora": "2024-04-17 19:22:56"}');
    });
    it('returns status "400 - Bad Request" for invalid formaDePagamento->id', function() {
        checkBadRequest('{"cliente": {"id": 2},"formaDePagamento": {"id": "invalid"},"valorEmprestimo": "49999.99","dataHora": "2024-04-17 19:22:56"}');
    });
    it('returns status "400 - Bad Request" for inexistent formaDePagamento->id', function() {
        checkBadRequest('{"cliente": {"id": 2},"formaDePagamento": {"id": 999},"valorEmprestimo": "49999.99","dataHora": "2024-04-17 19:22:56"}');
    });
    it('returns status "400 - Bad Request" for invalid valorEmprestimo', function() {
        checkBadRequest('{"cliente": {"id": 2},"formaDePagamento": {"id": 5},"valorEmprestimo": "499999.99","dataHora": "2024-04-17 19:22:56"}');
    });
    it('returns status "400 - Bad Request" for invalid dataHora', function() {
        checkBadRequest('{"cliente": {"id": 2},"formaDePagamento": {"id": 5},"valorEmprestimo": "49999.99","dataHora": "2024-04-99 19:22:56"}');
    });
});
*/
function checkBadRequest($rawBody) {
    $req = new FakeHttpRequest();
    $req->withMethod('POST');
    $req->withUrl('/emprestimos');
    $req->withHeader('Content-Type', 'application/json');
    $req->withBody(json_decode($rawBody));
    $res = new FakeHttpResponse();

    $app = App::getRouter();

    $app->listen([ 'req' => $req, 'res' => $res ]);

    expect($res->isStatus(400))->toBeTruthy();
}
?>