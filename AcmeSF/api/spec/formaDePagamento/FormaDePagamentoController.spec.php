<?php

use phputil\router\FakeHttpRequest;
use phputil\router\FakeHttpResponse;

require_once "vendor/autoload.php";

describe('FormaDePagamentoController', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves all Formas De Pagamento', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/formasDePagamento');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();
    });
    it('retrieves one Forma de Pagamento by id', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/formasDePagamento/1');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();

        $formaDePagamento = json_decode($resObj->body[0]);

        expect($formaDePagamento->id)->toBe(1);
        expect($formaDePagamento->descricao)->toBe('1 vez');
        expect($formaDePagamento->meses)->toBe(1);
        expect($formaDePagamento->juros)->toBe(0.025);
    });
    it('returns status "404 - Not Found" for an inexistant Forma de Pagamento id', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('GET');
        $req->withUrl('/formasDePagamento/999');
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        expect($res->isStatus(404))->toBeTruthy();
    });

});

?>