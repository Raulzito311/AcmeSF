<?php
require_once "vendor/autoload.php";

class EmprestimoController {
    private EmprestimoView $view;
    private EmprestimoRepository $repository;

    function __construct($view, $repository) {
        $this->view = $view;
        $this->repository = $repository;
    }

    public function buscarTodos(): void {
        $emprestimos = $this->repository->buscarTodos();
        $this->view->writeAll($emprestimos);
    }

    public function adicionar(): void {
        $emprestimo = $this->repository->adicionar($this->view->read());
        $this->view->write($emprestimo);
    }
}

?>

