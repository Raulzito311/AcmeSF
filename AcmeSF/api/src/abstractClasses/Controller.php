<?php
require_once "vendor/autoload.php";

abstract class Controller {
    protected $view;
    protected $repository;
    protected bool $repositoryError = false;

    function __construct($view, $repositoryClass) {
        $this->view = $view;
        try {
            $this->repository = new $repositoryClass();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            $this->repositoryError = true;
        }
    }

    public function buscarPeloId(): void {
        if ($this->repositoryError) return;

        $id = $this->view->readId();
        try {
            $obj = $this->repository->buscarPeloId($id);
            if (!$obj) {
                $this->view->notFound();
                return;
            }
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }
        $this->view->write($obj);
    }

    public function buscarTodos(): void {
        if ($this->repositoryError) return;
        
        try {
            $objs = $this->repository->buscarTodos();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }
        $this->view->writeAll($objs);
    }

    public function adicionar(): void {
        if ($this->repositoryError) return;
        
        try {
            $dto = $this->view->read();
            $dto->validarDados();
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }
        try {
            $objAdded = $this->repository->adicionar($dto);
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }
        $this->view->writeAdded($objAdded);
    }
}

?>

