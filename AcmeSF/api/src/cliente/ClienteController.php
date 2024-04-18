<?php
require_once "vendor/autoload.php";

class ClienteController {
    private ClienteView $view;
    private ClienteRepository $repository;

    function __construct($view, $repository) {
        $this->view = $view;
        $this->repository = $repository;
    }

    public function buscarPeloId(): void {
        $id = $this->view->readId();
        $cliente = $this->repository->buscarPeloId($id);
        $this->view->write($cliente);
    }

    public function buscarPeloCPF(): void {
        $cpf = $this->view->readCPF();
        $cliente = $this->repository->buscarPeloCPF($cpf);
        $this->view->write($cliente);
    }

    public function buscarTodos(): void {
        $clientes = $this->repository->buscarTodos();
        $this->view->writeAll($clientes);
    }
}

?>

