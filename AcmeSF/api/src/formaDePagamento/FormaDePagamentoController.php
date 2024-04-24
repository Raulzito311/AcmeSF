<?php
require_once "vendor/autoload.php";

class FormaDePagamentoController extends Controller {
    function __construct(FormaDePagamentoView $view) {
        parent::__construct($view, FormaDePagamentoRepositoryBDR::class);
    }
}

?>