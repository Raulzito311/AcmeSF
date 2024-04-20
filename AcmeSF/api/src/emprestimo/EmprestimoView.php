<?php

require_once "vendor/autoload.php";

class EmprestimoView extends View {
    public function readCPF(): ?string {
        return $this->req->param('cpf');
    }

    public function read(): EmprestimoDTO {
        $body = $this->req->body();
        $body->clienteId = $body->cliente->id;
        $body->formaDePagamentoId = $body->formaDePagamento->id;

        return EmprestimoDTO::of($body);
    }
}

?>