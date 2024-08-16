<?php

class ControleDeTransacaoBDR {

    static function executar(callable $unidadeDeTrabalho): void {
        $pdo = Connection::get();
        $pdo->beginTransaction();
        try {
            $unidadeDeTrabalho();
            $pdo->commit();
        } catch(Exception $e) {
            $pdo->rollBack();
            throw $e;
        }
    }
}

?>