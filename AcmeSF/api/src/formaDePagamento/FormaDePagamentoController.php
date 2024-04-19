<?php
require_once "vendor/autoload.php";

class FormaDePagamentoController {
    private FormaDePagamentoView $view;
    private FormaDePagamentoRepository $repository;

    function __construct($view) {
        $this->view = $view;
        $this->repository = new FormaDePagamentoRepositoryBDR();
    }

    public function buscarPeloId(): void {
        $id = $this->view->readId();
        $formaDePagamento = $this->repository->buscarPeloId($id);
        $this->view->write($formaDePagamento);
    }

    public function buscarTodos(): void {
        $formasDePagamento = $this->repository->buscarTodos();
        $this->view->writeAll($formasDePagamento);
    }
}

?>

