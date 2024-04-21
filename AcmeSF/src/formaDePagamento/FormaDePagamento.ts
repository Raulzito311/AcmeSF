export class FormaDePagamento {
    readonly id: number;
    readonly descricao: string;
    readonly meses: number;
    readonly juros: number;

    constructor(id: number, descricao: string, meses: number, juros: number) {
        this.id = id;
        this.descricao = descricao;
        this.meses = meses;
        this.juros = juros;
    }

    static of(json: FormaDePagamentoJson) {
        return new this(json.id, <string>json.descricao, <number>json.meses, <number>json.juros);
    }
}

export type FormaDePagamentoJson = {
	id: number;
    descricao?: string;
    meses?: number;
    juros?: number;
}
