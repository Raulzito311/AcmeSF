<?php

require_once "vendor/autoload.php";

class ClienteView extends View {
    public function readCPF():string{
        return $this->req->param('cpf');
    }
}

?>