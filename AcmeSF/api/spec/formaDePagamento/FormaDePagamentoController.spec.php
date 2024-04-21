<?php

use phputil\router\FakeHttpRequest;
use phputil\router\FakeHttpResponse;

require_once "vendor/autoload.php";

describe('ClienteController', function() {
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

});

?>