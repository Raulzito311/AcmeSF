<?php

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

require_once "vendor/autoload.php";

abstract class View {

    private HttpRequest $req;
    private HttpResponse $res;

    function __construct(HttpRequest $req, HttpResponse $res) {
        $this->req = $req;
        $this->res = $res;
    }

    public abstract function read();
    public abstract function write($obj);

    public function readId(): string {
        return $this->req->param('id');
    }

    public function notFound(): void {
        $this->res->status(404)->end();
    }

    public function writeAll(array $objs): void {
        $this->res->status(200)->json(json_encode($objs));
    }
}

?>