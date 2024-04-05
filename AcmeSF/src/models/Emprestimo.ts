export class Emprestimo {
    clienteId: number; 
    valorEmprestimo: number;
    dataHora: Date; 
    valorFinal: number; 
    parcelas: number[];
    formaDePagamento: FormaDePagamento;
  
    constructor(
      clienteId: number,
      valorEmprestimo: number,
      dataHora: Date,
      valorFinal: number,
      formaDePagamento: FormaDePagamento
    ) {
      this.clienteId = clienteId;
      this.valorEmprestimo = valorEmprestimo;
      this.dataHora = dataHora;
      this.valorFinal = valorFinal;
      this.parcelas = [];
      this.formaDePagamento = formaDePagamento;
    }

    calcularValorFinal(): void {
        let formaPagamento = this.formaDePagamento;
        this.valorFinal = this.valorEmprestimo + (this.valorEmprestimo * formaPagamento.juros);
    }
  
    calcularParcelas(): void {
        let formaPagamento = this.formaDePagamento;
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
  