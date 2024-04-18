<?php

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

require_once "vendor/autoload.php";

class EmprestimoView extends View {
    public function read(): Emprestimo {
        $body = $this->req->body();
        return new Emprestimo(null, $body->clienteId, $body->formaDePagamentoId, $body->valorEmprestimo, $body->dataHora);
    }

    public function write(Emprestimo $emprestimo): void {
        $this->res->status(200)->json(json_encode($emprestimo));
    }
}

?>