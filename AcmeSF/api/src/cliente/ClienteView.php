<?php

require_once "vendor/autoload.php";

class ClienteView extends View {
    public function read(): Cliente {
        return Cliente::ofObj($this->req->body());
    }

    public function readCPF(): ?string {
        return $this->readParam('cpf');
    }
}

?>