<?php
require_once "vendor/autoload.php";

class ViewFormaDePagamento {

    private $req;
    private $res;

    function __construct($req, $res) {
        $this->req = $req;
        $this->res = $res;
    }

    public function readId(): string {
        return $this->req->param('id');
    }

    public function write(FormaDePagamento $formaDePagamento): void {
        // TODO: usar res para enviar de volta
    }

    public function writeAll(array $formasDePagamento): void {
        // TODO: usar res para enviar de volta
    }
}

?>