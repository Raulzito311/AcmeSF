export class Emprestimo {
    clienteId: number; 
    valorEmprestimo: number;
    formaPagamentoId: number; 
    dataHora: Date; 
    valorFinal: number; 
    parcelas: number[];
  
    constructor(
      clienteId: number,
      valorEmprestimo: number,
      formaPagamentoId: number,
      dataHora: Date,
      valorFinal: number,
    ) {
      this.clienteId = clienteId;
      this.valorEmprestimo = valorEmprestimo;
      this.formaPagamentoId = formaPagamentoId;
      this.dataHora = dataHora;
      this.valorFinal = valorFinal;
      this.parcelas = [];
    }

    calcularValorFinal(): void {
        let formaPagamento = obterFormaDePagamentoPeloId(this.formaPagamentoId); //linha passivel de erro pois a função obterFormaDePagamentoPeloId ainda não foi implementada
        this.valorFinal = this.valorEmprestimo + (this.valorEmprestimo * formaPagamento.juros);
    }
  
    gerarParcelas(): void {
        let formaPagamento = obterFormaDePagamentoPeloId(this.formaPagamentoId); //linha passivel de erro pois a função obterFormaDePagamentoPeloId ainda não foi implementada
        let valorParcela = parseFloat((this.valorFinal / formaPagamento.meses).toFixed(2));
        let soma = valorParcela * formaPagamento.meses;

        for(let i = 0; i < formaPagamento.meses; i++){
            this.parcelas.push(valorParcela);
        }

        if(this.valorFinal > soma){
            let ValorSobra = this.valorFinal - soma;
            this.parcelas[this.parcelas.length - 1] = parseFloat((this.parcelas[this.parcelas.length - 1] + ValorSobra).toFixed(2));
        }
    }
  }
  