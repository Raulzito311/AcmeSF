<?php

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

require_once "vendor/autoload.php";

class ClienteView extends View {
    public function write(Cliente $cliente): void {
        $this->res->status(200)->json(json_encode($cliente));
    }
}
?>