<?php
require_once "vendor/autoload.php";

class EmprestimoRepositoryBDR implements EmprestimoRepository {
    public function buscarPeloId($id): ?Emprestimo {
        try{
            $ps = Connection::get()->prepare('SELECT * FROM emprestimos WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Emprestimo::class);
            $ps->execute([$id]);
    
            return $ps->fetchObject(Emprestimo::class);
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar emprestimo com id $id | " . $e->getMessage(), 500);
        }
    }

    public function buscarTodos(): array {
        try{
            $ps = Connection::get()->prepare('SELECT * FROM emprestimos');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Emprestimo::class);
            $ps->execute();
            
            return $ps->fetchAll();
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar emprestimos | ' . $e->getMessage(), 500);
        }
    }

    public function adicionar(Emprestimo $emprestimo): ?Emprestimo {
        try{
            $ps = Connection::get()->prepare('INSERT INTO emprestimos (clienteId, formaDePagamentoId, valorEmprestimo, dataHora) VALUES (?, ?, ?, ?)');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Emprestimo::class);
            $ps->execute([$emprestimo->clienteId, $emprestimo->formaDePagamentoId, $emprestimo->valorEmprestimo, $emprestimo->dataHora]);

            return $this->buscarPeloId(Connection::get()->lastInsertId());
        }catch(Exception $e){
            throw new RepositoryException('Erro ao adicionar emprestimo | ' . $e->getMessage(), 500);
        }
    }
}
?>