<?php

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

require_once "vendor/autoload.php";

class FormaDePagamentoView extends View {
    public function write(FormaDePagamento $formaDePagamento): void {
        $this->res->status(200)->json($formaDePagamento);
    }
}

?>