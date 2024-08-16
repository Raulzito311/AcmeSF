<?php
require_once "vendor/autoload.php";

class ParcelaRepositoryBDR implements ParcelaRepository {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connection::get();
    }

    public function buscarParcelaParaPagar(int $emprestimoId): ParcelaDTO|false {
        try{
            $ps = $this->pdo->prepare('SELECT id, valor FROM parcela WHERE emprestimoId = ? AND paga = 0 ORDER BY dataVencimento ASC LIMIT 1');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, ParcelaDTO::class);
            $ps->execute([$emprestimoId]);
    
            return $ps->fetchObject(ParcelaDTO::class);
        }catch(PDOException $e){
            throw new RepositoryException("Erro ao consultar parcela para pagar do emprestimo com id $emprestimoId | " . $e->getMessage());
        }
    }

    /**
     * @return Parcela[]
     */
    function buscarParcelasDoEmprestimo(int $emprestimoId): array {
        try{
            $ps = $this->pdo->prepare('SELECT p.id, p.valor, p.paga, p.dataVencimento, p.dataHoraPagamento, u.nome as usuarioPagamento FROM parcela p LEFT JOIN usuario u ON (p.usuarioPagamentoId = u.id) WHERE emprestimoId = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, ParcelaDTO::class);
            $ps->execute([$emprestimoId]);
    
            $parcelas = [];
            while ($dto = $ps->fetchObject(ParcelaDTO::class)) {
                $parcelas[] = $dto;
            }
            
            return $parcelas;
        }catch(PDOException $e){
            throw new RepositoryException("Erro ao consultar parcelas do emprestimo com id $emprestimoId | " . $e->getMessage());
        }
    }

    function pagarParcela(int $usuarioPagamentoId, int $parcelaId): bool {
        try {
            $ps = $this->pdo->prepare('UPDATE parcela SET paga = 1, dataHoraPagamento = NOW(), usuarioPagamentoId = ? WHERE id = ?');
        
            $ps->execute([$usuarioPagamentoId, $parcelaId]);

            return $ps->rowCount() > 0;
        } catch (PDOException $e) {
            throw new RepositoryException("Erro ao pagar parcela com id $parcelaId | " . $e->getMessage());
        }
    }
    /**
     * @param Parcela[] $parcela
     * 
     * @return Parcela[]
     */
    function adicionarParcelas(array $parcelas): array|false {

    }
}
?>