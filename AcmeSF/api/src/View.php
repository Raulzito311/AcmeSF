<?php
require_once "vendor/autoload.php";

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

abstract class View {

    protected HttpRequest $req;
    protected HttpResponse $res;

    function __construct(HttpRequest $req, HttpResponse $res) {
        $this->req = $req;
        $this->res = $res;
    }

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