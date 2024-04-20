<?php
require_once "vendor/autoload.php";

class ClienteController extends Controller {
    function __construct($view) {
        parent::__construct($view, ClienteRepositoryBDR::class);
    }

    public function buscarPeloCPF(): void {
        if ($this->repositoryError) return;
        
        $cpf = $this->view->readCPF();
        try {
            $cliente = $this->repository->buscarPeloCPF($cpf);
            if (!$cliente) {
                $this->view->notFound();
                return;
            }
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }
        $this->view->write($cliente);
    }
}

?>

