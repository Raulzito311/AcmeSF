<?php
require_once "vendor/autoload.php";

class EmprestimoController extends Controller {
    function __construct($view) {
        parent::__construct($view, EmprestimoRepositoryBDR::class);
    }
}

?>

