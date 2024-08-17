<?php

class Emprestimo {
	public function __construct(public readonly int $id, 
								public readonly Cliente $cliente, 
								public readonly FormaDePagamento $formaDePagamento, 
								public readonly float $valorEmprestimo, 
								public readonly string $dataHora) { }

    public static function of(EmprestimoDTO $body): Emprestimo {
		$emprestimo = new Emprestimo($body->id, Cliente::of($body), FormaDePagamento::of($body), $body->valorEmprestimo, $body->dataHora);

		return $emprestimo;
	}

	public function calcularValorComJuros() {
		return $this->valorEmprestimo + ($this->valorEmprestimo * $this->formaDePagamento->juros);
	}

	public static function calcularParcelas(float $valorEmprestimo, FormaDePagamento $formaDePagamento, ?int $emprestimoId = null): array {
		$valorFinal = $valorEmprestimo + ($valorEmprestimo * $formaDePagamento->juros);
		$valorPorParcela = floor(($valorFinal / $formaDePagamento->meses) * 100) / 100;
		$centavosSobrando = round(($valorFinal - ($valorPorParcela * $formaDePagamento->meses)) * 100);
	
		$parcelas = [];
		$dataAtual = new DateTime();
	
		for ($i = 0; $i < $formaDePagamento->meses; $i++) {
			$valor = $valorPorParcela;
			if ($centavosSobrando > 0) {
				$valor += 0.01;
				$centavosSobrando--;
			}
			$valor = round($valor * 100) / 100;

			$dataAtual->add(new DateInterval('P30D')); // Parcelas vencem de 30 em 30 dias
			$dataVencimento = $dataAtual->format('Y-m-d');

			$parcelas[] = Parcela::criarParcela($valor, $dataVencimento, $emprestimoId);
		}
	
		return $parcelas;
	}
}

?>