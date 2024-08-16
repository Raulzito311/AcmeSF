<?php
require_once "vendor/autoload.php";

class ParcelaController {
    private ParcelaView $view;
    private ParcelaRepository $repository;
    private Session $session;

    function __construct(ParcelaView $view, Session $session) {
        $this->view = $view;
        $this->session = $session;
        
        try {
            $this->repository = new ParcelaRepositoryBDR();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
        }
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

    public function pagarParcela(): void {
        if (!isset($this->repository)) return;

        try {
            $usuarioLogado = $this->session->buscarUsuarioRegistrado();
    
            $emprestimoId = $this->view->readId();

            $parcela = $this->repository->buscarParcelaParaPagar($emprestimoId);

            if (!$parcela) {
                $this->view->notFound("Não há parcelas em aberto para o empréstimo com id $emprestimoId");
                return;
            }

            ControleDeTransacaoBDR::executar(function() use ($usuarioLogado, $parcela, $emprestimoId) {
                $res = $this->repository->pagarParcela($usuarioLogado->id, $parcela->id);

                if (!$res) throw new RepositoryException("Parcela inexistente");
                
                $clienteRepository = new ClienteRepositoryBDR();
                $res = $clienteRepository->aumentarLimiteDoClienteDoEmprestimo($parcela->valor, $emprestimoId);

                if (!$res) throw new RepositoryException("Erro ao aumentar limite");
            });
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }

        $this->view->noContent();
    }
}

?>