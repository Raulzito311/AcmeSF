<?php
require_once "vendor/autoload.php";

class EmprestimoRepositoryBDR implements EmprestimoRepository {
    private PDO $pdo;
    private ClienteRepository $clienteRepo;
    private FormaDePagamentoRepository $formaDePagamentoRepo;

    public function __construct() {
        $this->pdo = Connection::get();
        $this->clienteRepo = new ClienteRepositoryBDR();
        $this->formaDePagamentoRepo = new FormaDePagamentoRepositoryBDR();
    }

    private function montarEmprestimo($dto): Emprestimo {
        $cliente = $this->clienteRepo->buscarPeloId($dto->clienteId);
            
        $formaDePagamento = $this->formaDePagamentoRepo->buscarPeloId($dto->formaDePagamentoId);
        
        return new Emprestimo($dto->id, $cliente, $formaDePagamento, $dto->valorEmprestimo, $dto->dataHora);
    }

    public function buscarPeloId($id): Emprestimo|bool {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM emprestimos WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, EmprestimoDTO::class);
            $ps->execute([$id]);
    
            $dto = $ps->fetchObject(EmprestimoDTO::class);
            
            return $dto ? $this->montarEmprestimo($dto) : $dto;
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar emprestimo com id $id | " . $e->getMessage());
        }
    }

    public function buscarTodos(): array {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM emprestimos');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, EmprestimoDTO::class);
            $ps->execute();
            
            $dtos = $ps->fetchAll();

            return array_map(function($dto) {
                return $this->montarEmprestimo($dto);
            }, $dtos);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar emprestimos | ' . $e->getMessage());
        }
    }

    public function adicionar(EmprestimoDTO $emprestimo): Emprestimo {
        try{
            $ps = $this->pdo->prepare('INSERT INTO emprestimos (clienteId, formaDePagamentoId, valorEmprestimo, dataHora) VALUES (?, ?, ?, ?)');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, Emprestimo::class);
            $ps->execute([$emprestimo->clienteId, $emprestimo->formaDePagamentoId, $emprestimo->valorEmprestimo, $emprestimo->dataHora]);

            return $this->buscarPeloId($this->pdo->lastInsertId());
        }catch(Exception $e){
            throw new RepositoryException('Erro ao adicionar emprestimo | ' . $e->getMessage());
        }
    }
}
?>