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
}

?>