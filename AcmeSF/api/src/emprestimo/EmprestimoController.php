<?php
require_once "vendor/autoload.php";

class EmprestimoController extends Controller {
    function __construct(EmprestimoView $view) {
        parent::__construct($view, EmprestimoRepositoryBDR::class);
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
            ControleDeTransacaoBDR::executar(function() use ($dto) {
                $emprestimo = $this->repository->adicionar($dto);

                if (!$emprestimo) throw new RepositoryException("Erro ao adicionar emprestimo");
                
                $parcelas = Emprestimo::calcularParcelas($emprestimo->valorEmprestimo, $emprestimo->formaDePagamento, $emprestimo->id);

                $parcelaRepository = new ParcelaRepositoryBDR();
                $res = $parcelaRepository->adicionarParcelas($parcelas);

                if (!$res) throw new RepositoryException("Erro ao criar parcelas");

                $clienteRepository = new ClienteRepositoryBDR();
                $res = $clienteRepository->ajustarLimiteDoClienteDoEmprestimo(-$emprestimo->valorComJuros, $emprestimo->id);

                if (!$res) throw new RepositoryException("Erro ao aumentar limite");
            });
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }

        $this->view->created();
    }

    public function simular(): void {
        if (!isset($this->repository)) return;

        try {
            $dto = $this->view->readSimular();
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        } catch (TypeError $e) {
            $this->view->error(400, 'You must provide a JSON body for this request.');
            return;
        }

        try {
            $formaDePagamentoRepository = new FormaDePagamentoRepositoryBDR();
            $formaDePagamento = $formaDePagamentoRepository->buscarPeloId($dto->formaDePagamentoId);

            if (!$formaDePagamento) throw new DataException("A Forma de Pagamento fornecida não existe");

            $parcelas = Emprestimo::calcularParcelas($dto->valorEmprestimo, $formaDePagamento);
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
            return;
        }
            
        $this->view->write($parcelas);
    }
}

?>