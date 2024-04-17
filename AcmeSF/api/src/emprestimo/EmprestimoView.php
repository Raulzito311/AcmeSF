<?php

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

require_once "vendor/autoload.php";

class EmprestimoView extends View {

    private HttpRequest $req;
    private HttpResponse $res;

    function __construct(HttpRequest $req, HttpResponse $res) {
        parent::__construct($req, $res);
        $this->req = $req;
        $this->res = $res;
    }

    public function read(): Emprestimo {
        $body = $this->req->body();
        return new Emprestimo(null, $body->clienteId, $body->formaDePagamentoId, $body->valorEmprestimo, $body->dataHora);
    }

    public function write(Emprestimo $emprestimo): void {
        $this->res->status(200)->json(json_encode($emprestimo));
    }
}

?>