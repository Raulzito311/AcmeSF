<?php

class ClienteRepositoryBDR implements ClienteRepository {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connection::get();
    }

    public function buscarTodos(): array {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM clientes');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute();
            
            return $ps->fetchAll();
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar clientes | ' . $e->getMessage() . ' | ' . $e->getPrevious()->getMessage(), 500);
        }
    }

    public function buscarPeloId($id): ?Cliente {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM clientes WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute([$id]);
    
            return $ps->fetchObject(Cliente::class);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar cliente' . $e->getMessage(), 500);
        }
    }

    public function buscarPeloCPF($cpf): ?Cliente {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM clientes WHERE cpf = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute([$cpf]);
    
            return $ps->fetchObject(Cliente::class);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar cliente' . $e->getMessage(), 500);
        }
    }
}
?>