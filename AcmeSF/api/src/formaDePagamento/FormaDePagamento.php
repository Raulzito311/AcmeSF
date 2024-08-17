<?php
use phputil\traits\WithBuilder;

class FormaDePagamento {

	use WithBuilder;

    public readonly int $id;
    public readonly string $descricao;
    public readonly int $meses;
    public readonly float $juros;

    public static function of(EmprestimoDTO $body): FormaDePagamento {
		$formaDePagamento = new FormaDePagamento();

        $formaDePagamento->id = $body->formaDePagamentoId;
        $formaDePagamento->descricao = $body->descricao;
        $formaDePagamento->meses = $body->meses;
        $formaDePagamento->juros = $body->juros;

		return $formaDePagamento;
	}
}

?>