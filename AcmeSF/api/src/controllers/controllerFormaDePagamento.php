<?php
require_once "vendor/autoload.php";

class controllerFormaDePagamento {
    protected FormaDePagamentoRepositoryBDR $RepositoryEmBDR;
    protected Conexao $conexaoFormaDePagamento;

    
    function __construct()
    {   
        $this->conexaoFormaDePagamento = new conexao();
        $this->RepositoryEmBDR = new FormaDePagamentoRepositoryBDR($this->conexaoFormaDePagamento->getConexao());
        $this->conexaoFormaDePagamento->encerrar();
    }

    function buscarPeloId($id){
        $this->conexaoFormaDePagamento->iniciar();
        $formaDePagamento = $this->RepositoryEmBDR->buscarPeloId($id);
        $this->conexaoFormaDePagamento->encerrar();
        if($formaDePagamento){
            return $formaDePagamento;
        }
        return "Não foram encontrados formas de pagamento com esse id";
    }

    function buscarTodos(){
        $this->conexaoFormaDePagamento->iniciar();
        $formasDePagamento = $this->RepositoryEmBDR->buscarTodos();
        $this->conexaoFormaDePagamento->encerrar();
        if(!empty($formasDePagamento)){
            return $formasDePagamento;
        }
        return "Não foi encontrado nenhum cliente";
    }
}

?>

