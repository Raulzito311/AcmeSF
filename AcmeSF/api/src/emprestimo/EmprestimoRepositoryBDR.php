<?php
require_once "vendor/autoload.php";

class EmprestimoRepositoryBDR implements EmprestimoRepository {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connection::get();
    }

    public function buscarPeloId(string $id): Emprestimo|false {
        try{
            $ps = $this->pdo->prepare('SELECT e.id, e.clienteId, e.formaDePagamentoId, e.valorEmprestimo, e.dataHora, c.cpf, c.nome, c.dataNascimento, c.telefone, c.email, c.endereco, c.limiteCredito, f.descricao, f.meses, f.juros FROM emprestimo e JOIN cliente c ON (e.clienteId = c.id) JOIN forma_de_pagamento f ON (e.formaDePagamentoId = f.id) WHERE e.id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, EmprestimoDTO::class);
            $ps->execute([$id]);
    
            $dto = $ps->fetchObject(EmprestimoDTO::class);
            
            return $dto ? Emprestimo::of($dto) : $dto;
        }catch(PDOException $e){
            throw new RepositoryException("Erro ao consultar emprestimo com id $id | " . $e->getMessage());
        }
    }

    /**
     * @return Emprestimo[]
     */
    public function buscarTodos(): array {
        try{
            $ps = $this->pdo->prepare('SELECT e.id, e.clienteId, e.formaDePagamentoId, e.valorEmprestimo, e.dataHora, c.cpf, c.nome, c.dataNascimento, c.telefone, c.email, c.endereco, c.limiteCredito, f.descricao, f.meses, f.juros FROM emprestimo e JOIN cliente c ON (e.clienteId = c.id) JOIN forma_de_pagamento f ON (e.formaDePagamentoId = f.id) ORDER BY dataHora DESC');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, EmprestimoDTO::class);
            $ps->execute();
            
            $dtos = $ps->fetchAll();

            return array_map(function($dto) {
                return Emprestimo::of($dto);
            }, $dtos);
        }catch(PDOException $e){
            throw new RepositoryException('Erro ao consultar emprestimos | ' . $e->getMessage());
        }
    }

    public function adicionar(EmprestimoDTO $emprestimo): Emprestimo|false {
        try{
            $ps = $this->pdo->prepare('INSERT INTO emprestimo (clienteId, formaDePagamentoId, valorEmprestimo, dataHora) VALUES (?, ?, ?, NOW())');
            $ps->execute([$emprestimo->clienteId, $emprestimo->formaDePagamentoId, $emprestimo->valorEmprestimo]);

            return $this->buscarPeloId($this->pdo->lastInsertId());
        }catch(PDOException $e){
            if ($e->getCode() == 23000)
                throw new DataException($e->errorInfo[2]);
            throw new RepositoryException('Erro ao adicionar emprestimo | ' . $e->getMessage());
        }
    }
}
?>