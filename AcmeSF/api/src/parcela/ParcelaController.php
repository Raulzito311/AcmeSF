<?php
require_once "vendor/autoload.php";

class ParcelaController extends Controller {
    function __construct(ParcelaView $view) {
        parent::__construct($view, ParcelaRepositoryBDR::class);
    }

    public function buscarParcelasDoEmprestimo(): void {
        if (!isset($this->repository)) return;

        $id = $this->view->readId();
        try {
            $parcelas = $this->repository->buscarParcelasDoEmprestimo($id);
            if (empty($parcelas)) {
                $this->view->notFound();
                return;
            }
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }
        $this->view->write($parcelas);
    }
}

?>