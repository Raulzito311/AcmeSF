<?php
require_once "vendor/autoload.php";

class FormaDePagamentoRepositoryBDR implements FormaDePagamentoRepository {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connection::get();
    }

    public function buscarPeloId(string $id): FormaDePagamento|false {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM forma_de_pagamento WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, FormaDePagamento::class);
            $ps->execute([$id]);
    
            return $ps->fetchObject(FormaDePagamento::class);
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar formas de pagamento' . $e->getMessage());
        }
    }

    /**
     * @return FormaDePagamento[]
     */
    public function buscarTodos(): array {
        try{
            $ps = $this->pdo->prepare('SELECT * FROM forma_de_pagamento');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, FormaDePagamento::class);
            $ps->execute();
            
            return $ps->fetchAll();
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar formas de pagamento | ' . $e->getMessage() . ' | ' . $e->getPrevious()->getMessage());
        }
    }
}
?>