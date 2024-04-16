<?php
require_once "vendor/autoload.php";

class FormaDePagamentoRepositoryBDR implements FormaDePagamentoRepository {

    public function buscarPeloId($id): ?FormaDePagamento {
        try{
            $ps = Connection::get()->prepare('SELECT * FROM formas_de_pagamento WHERE id = ?');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'FormaDePagamento');
            $ps->execute([$id]);
    
            return $ps->fetchObject('FormaDePagamento');
        }catch(Exception $e){
            throw new RepositoryException('Erro ao consultar formas de pagamento' . $e->getMessage(), 500);
        }
    }

    public function buscarTodos():array {
        try{
            $ps = Connection::get()->prepare('SELECT * FROM formas_de_pagamento');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'FormaDePagamento');
            $ps->execute();
            
            return $ps->fetchAll();
        }catch(Exception $e){
            throw new RepositoryException("Erro ao consultar formas de pagamento" . $e->getMessage(), 500);
        }
    }
}
?>