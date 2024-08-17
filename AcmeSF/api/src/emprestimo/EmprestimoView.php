<?php

require_once "vendor/autoload.php";

class EmprestimoView extends View {
    public function read(): EmprestimoDTO {
        return EmprestimoDTO::of($this->req->body());
    }

    public function readSimular(): SimularDTO {
        return SimularDTO::of($this->req->body());
    }
}

?>