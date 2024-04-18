<?php

class ClienteRepositoryBDR implements ClienteRepository{
    protected PDO $pdo;
    
    public function buscarTodos():array{
        try{
            $ps = Connection::get()->prepare('SELECT * FROM clientes');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute();
            
            return $ps->fetchAll();
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar formas de pagamento | ' . $e->getMessage() . ' | ' . $e->getPrevious()->getMessage(), 500);
        }
    }

    public function buscarPeloId($id): Cliente{
        try{
            $ps = Connection::get()->prepare('SELECT * FROM clientes WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Cliente::class);
            $ps->execute([$id]);
    
            return $ps->fetchObject(Cliente::class);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar formas de pagamento' . $e->getMessage(), 500);
        }
    }
}
?>