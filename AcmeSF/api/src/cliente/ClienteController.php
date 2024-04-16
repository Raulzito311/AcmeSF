<?php
require_once "vendor/autoload.php";

class ClienteController {
    protected ClienteRepositoryBDR $RepositoryEmBDR;
    protected $conexaoCliente;

    function __construct()
    {   
        $this->conexaoCliente = new conexao();
        $this->RepositoryEmBDR = new ClienteRepositoryBDR($this->conexaoCliente->getConexao());
        $this->conexaoCliente->encerrar();
    }

    function buscarPeloId($id){
        $this->conexaoCliente->iniciar();
        $cliente = $this->RepositoryEmBDR->buscarPeloId($id);
        $this->conexaoCliente->encerrar();
        if($cliente){
            return $cliente;
        }
        return "Não foram encontrados clientes com esse id";
    }

    function buscarTodos(){
        $this->conexaoCliente->iniciar();
        $clientes = $this->RepositoryEmBDR->buscarTodos();
        $this->conexaoCliente->encerrar();
        if(!empty($clientes)){
            return $clientes;
        }
        return "Não foi encontrado nenhum cliente";
    }
}

?>

