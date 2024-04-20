<?php
require_once "vendor/autoload.php";

class FormaDePagamentoController extends Controller {
    function __construct($view) {
        parent::__construct($view, FormaDePagamentoRepositoryBDR::class);
    }
}

?>

