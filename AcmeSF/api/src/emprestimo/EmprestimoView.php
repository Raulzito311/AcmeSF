<?php

require_once "vendor/autoload.php";

class EmprestimoView extends View {
    public function read(): EmprestimoDTO {
        return EmprestimoDTO::of($this->req->body());
    }

    public function readSimular(): SimularDTO {
        return SimularDTO::of($this->req->body());
    }

    public function readPeriodo(): array {
        $dataInicio = $this->readParam('dataInicio');
        $dataFim = $this->readParam('dataFim');

        if (!isset($dataInicio) || !isset($dataFim)) {
            throw new DataException('Os parâmetros "dataInicio" e "dataFim" devem ser informados.');
        }

        return [
            'dataInicio' => $dataInicio,
            'dataFim' => $dataFim
        ];
    }

    public function readId(): string {
        return $this->readParam('id');
    }
}

?>