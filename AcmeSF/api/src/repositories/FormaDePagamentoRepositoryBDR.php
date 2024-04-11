<?php
require_once "vendor/autoload.php";

class FormaDePagamentoRepositoryBDR implements FormaDePagamentoRepository{
    protected PDO $pdo;

    function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }
    public function buscarTodos():array{
        try{
            $ps = $this->pdo->prepare("SELECT * FROM `formas_de_pagamento`");
            $ps->execute();
            $formasPagamento = [];
            
            while ($row = $ps->fetch(PDO::FETCH_ASSOC)) {
              $id = $row['id']; 
              $descricao = $row['descricao'];
              $meses = $row['meses'];
              $juros = $row['juros'];
          
              $formasPagamento[] = new FormaDePagamento($id, $descricao, $meses, $juros);
            }
            
            return $formasPagamento;
        
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar formas de pagamento" . $e->getMessage(), 500);
        }
    }
    public function buscarPeloId($id): FormaDePagamento{
        try{
            $ps = $this->pdo->prepare("SELECT * FROM `formas_de_pagamento` WHERE `id` = ?");
            $ps->execute([$id]);
            $row = $ps->fetch(PDO::FETCH_ASSOC);
            $id = $row['id']; 
            $descricao = $row['descricao'];
            $meses = $row['meses'];
            $juros = $row['juros'];
          
            $formaPagamento = new FormaDePagamento($id, $descricao, $meses, $juros);
            
            return $formaPagamento;
        
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar formas de pagamento" . $e->getMessage(), 500);
        }
    }
}
?>