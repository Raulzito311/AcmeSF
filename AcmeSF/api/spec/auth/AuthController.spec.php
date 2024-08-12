<?php

use phputil\router\FakeHttpRequest;
use phputil\router\FakeHttpResponse;

require_once "vendor/autoload.php";

/* TODO: describe('AuthController', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('authenticates the user', function() {
        $req = new FakeHttpRequest();
        $req->withMethod('POST');
        $req->withUrl('/auth/login');
        $req->withHeader('Content-Type', 'application/json');
        $req->withBody(json_decode('{"login": "raul","senha": "123456"}'));
        $res = new FakeHttpResponse();

        $app = App::getRouter();

        $app->listen([ 'req' => $req, 'res' => $res ]);

        var_dump($res);

        expect($res->isStatus(200))->toBeTruthy();

        $resObj = $res->dumpObject();

        expect(empty($resObj->body))->toBeFalsy();
    });
});*/
?>