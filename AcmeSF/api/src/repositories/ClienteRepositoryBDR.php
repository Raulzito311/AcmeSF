<?php

class ClienteRepositoryBDR implements ClienteRepository{
    protected PDO $pdo;

    function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }
    public function buscarTodos():array{
        try{
            $ps = $this->pdo->prepare("SELECT * FROM `clientes`");
            $ps->execute();
            $clientes = [];
            
            while ($row = $ps->fetch(PDO::FETCH_ASSOC)) {
                $id = $row['id']; 
                $cpf = $row['cpf'];
                $nome = $row['nome'];
                $dataNascimento = DateTime::createFromFormat('Y-m-d H:i:s', $row['dataNascimento']);
          
              $clientes[] = new Cliente($id, $cpf, $nome, $dataNascimento);
            }
            
            return $clientes;
        
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar clientes" . $e->getMessage(), 500);
        }
    }
    
    public function buscarPeloId($id): Cliente{
        try{
            $ps = $this->pdo->prepare("SELECT * FROM `clientes` WHERE `id` = ?");
            $ps->execute([$id]);
            $row = $ps->fetch(PDO::FETCH_ASSOC);
            $id = $row['id']; 
            $cpf = $row['cpf'];
            $nome = $row['nome'];
            $dataNascimento = DateTime::createFromFormat('Y-m-d H:i:s', $row['dataNascimento']);

            $cliente = new Cliente($id, $cpf, $nome, $dataNascimento);
            
            return $cliente;
        
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar cliente pelo Id" . $e->getMessage(), 500);
        }
    }
}
?>