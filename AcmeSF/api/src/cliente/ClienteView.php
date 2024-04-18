<?php

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

require_once "vendor/autoload.php";

class ClienteView extends View {

    private HttpRequest $req;
    private HttpResponse $res;

    function __construct(HttpRequest $req, HttpResponse $res) {
        parent::__construct($req, $res);
        $this->req = $req;
        $this->res = $res;
    }

    public function write(Cliente $cliente): void {
        $this->res->status(200)->json(json_encode($cliente));
    }
}
?>