<?php
require_once "vendor/autoload.php";

abstract class Controller {
    protected $view;
    protected $repository;

    function __construct($view, string $repositoryClass) {
        $this->view = $view;
        try {
            $this->repository = new $repositoryClass();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
        }
    }

    public function buscarPeloId(): void {
        if (!isset($this->repository)) return;

        $id = $this->view->readId();
        try {
            $obj = $this->repository->buscarPeloId($id);
            if (!$obj) {
                $this->view->notFound();
                return;
            }
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }
        $this->view->write($obj);
    }

    public function buscarTodos(): void {
        if (!isset($this->repository)) return;
        
        try {
            $objs = $this->repository->buscarTodos();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }
        $this->view->writeAll($objs);
    }

    public function adicionar(): void {
        if (!isset($this->repository)) return;

        try {
            $dto = $this->view->read();
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        } catch (TypeError $e) {
            $this->view->error(400, 'You must provide a JSON body for this request.');
            return;
        }
        try {
            $this->repository->adicionar($dto);
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }
        $this->view->created();
    }
}

?>