<?php
require_once "vendor/autoload.php";

class RepositorioFormaDePagamentoEmBDR implements RepositorioFormaDePagamento{
    protected PDO $pdo;

    function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }
    public function todasFormasDePagamentos():array{
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
            throw new RepositorioException("Erro ao consultar formas de pagamento" . $e->getMessage(), 500);
        }
    }
}
?>