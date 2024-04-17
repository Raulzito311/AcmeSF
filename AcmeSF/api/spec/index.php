<?php

use phputil\router\FakeHttpRequest;
use phputil\router\FakeHttpResponse;

require_once "vendor/autoload.php";

describe('API', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('Busca todas as Formas de Pagamento', function() {
        $req = new FakeHttpRequest();
        $req->withUrl('/formasDePagamento')->_method = 'GET';

        $res = new FakeHttpResponse();

        $app = App::getRouter();
        $app->listen(['req' => $req, 'res' => $res]);
    });
});
?>