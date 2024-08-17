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

    public function buscarPeloId(int $id): Cliente|false {
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
    
    function adicionar(Cliente $cliente): bool {
        try{
            $ps = $this->pdo->prepare('INSERT INTO cliente (cpf, nome, dataNascimento, telefone, email, endereco, limiteCredito) VALUES (?, ?, ?, ?, ?, ?, ?)');
            $ps->execute([$cliente->cpf, $cliente->nome, $cliente->dataNascimento, $cliente->telefone, $cliente->email, $cliente->endereco, $cliente->limiteCredito]);

            return $ps->rowCount() > 0;
        }catch(PDOException $e){
            if ($e->getCode() == 23000)
                throw new DataException($e->errorInfo[2]);
            throw new RepositoryException('Erro ao adicionar emprestimo | ' . $e->getMessage());
        }
    }

    function ajustarLimiteDoClienteDoEmprestimo(float $valor, int $emprestimoId): bool {
        try{
            $ps = $this->pdo->prepare('UPDATE cliente SET limiteCredito = limiteCredito + ? WHERE id = (SELECT clienteId FROM emprestimo WHERE id = ?)');
            $ps->execute([$valor, $emprestimoId]);
    
            return $ps->rowCount() > 0;
        }catch(Exception $e){
            throw new RepositoryException('Erro ao aumentar limite do cliente' . $e->getMessage());
        }
    }
}
?>