<?php

require_once "vendor/autoload.php";

class EmprestimoView extends View {
    public function read(): EmprestimoDTO {
        $body = $this->req->body();
        $body->clienteId = $body->cliente->id;
        $body->formaDePagamentoId = $body->formaDePagamento->id;

        return EmprestimoDTO::of($body);
    }

    public function write(Emprestimo $emprestimo): void {
        $this->res->status(200)->json($emprestimo);
    }
}

?>