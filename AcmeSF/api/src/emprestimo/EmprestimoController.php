<?php
require_once "vendor/autoload.php";

class EmprestimoController {
    private EmprestimoView $view;
    private EmprestimoRepository $repository;

    function __construct($view) {
        $this->view = $view;
        $this->repository = new EmprestimoRepositoryBDR();
    }

    public function buscarTodos(): void {
        $emprestimos = $this->repository->buscarTodos();
        $this->view->writeAll($emprestimos);
    }

    public function adicionar(): void {
        $emprestimoDTO = $this->view->read();
        try {
            $emprestimoDTO->validarDados();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
        }
        $emprestimoAdicionado = $this->repository->adicionar($emprestimoDTO);
        $this->view->write($emprestimoAdicionado);
    }
}

?>

