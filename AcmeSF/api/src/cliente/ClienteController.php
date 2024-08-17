<?php
require_once "vendor/autoload.php";

class ClienteController extends Controller {
    function __construct(ClienteView $view) {
        parent::__construct($view, ClienteRepositoryBDR::class);
    }

    public function buscarTodos(): void {
        $cpf = $this->view->readCPF();

        if ($cpf) {
            $this->buscarPeloCPF($cpf);
            return;
        }

        parent::buscarTodos();
    }

    private function buscarPeloCPF(string $cpf): void {
        if (!isset($this->repository)) return;
        
        try {
            $cliente = $this->repository->buscarPeloCPF($cpf);
            if (!$cliente) {
                $this->view->notFound();
                return;
            }
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }
        $this->view->write($cliente);
    }
}

?>