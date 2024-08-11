<?php

class ClienteRepositoryBDR implements ClienteRepository {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connection::get();
    }

    /**
     * @return Cliente[]
     */
    public function buscarTodos(): array {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM cliente');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute();
            
            return $ps->fetchAll();
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar clientes | ' . $e->getMessage() . ' | ' . $e->getPrevious()->getMessage());
        }
    }

    public function buscarPeloId(string $id): Cliente|false {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM cliente WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute([$id]);
    
            return $ps->fetchObject(Cliente::class);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar cliente' . $e->getMessage());
        }
    }

    public function buscarPeloCPF(string $cpf): Cliente|false {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM cliente WHERE cpf = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute([$cpf]);
    
            return $ps->fetchObject(Cliente::class);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar cliente' . $e->getMessage());
        }
    }
}
?>