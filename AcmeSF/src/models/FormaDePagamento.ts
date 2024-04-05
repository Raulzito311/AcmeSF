class FormaDePagamento{
    descricao : string;
    meses: number;
    juros: number;

    constructor(descricao: string, meses: number, juros: number){
        this.descricao = descricao;
        this.meses = meses;
        this.juros = juros;
    }
}