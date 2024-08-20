<?php

use phputil\traits\WithBuilder;

class RelatorioEmprestimos {

	use WithBuilder;

	public readonly string $data;
	public readonly int $totalEmprestimos;
	public readonly float $valorTotalEmprestimos;
	public readonly float $valorTotalComJuros;
	
}

?>