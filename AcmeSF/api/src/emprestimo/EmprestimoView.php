<?php

require_once "vendor/autoload.php";

class EmprestimoView extends View {
    public function read(): EmprestimoDTO {
        return EmprestimoDTO::of($this->req->body());
    }
}

?>