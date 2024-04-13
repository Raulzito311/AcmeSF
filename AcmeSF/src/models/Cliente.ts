export class Cliente {
    readonly id: number;
    readonly cpf: string;
    readonly nome: string;
    readonly dataNascimento: Date;

    constructor(id: number, cpf: string, nome: string, dataNascimento: Date) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }

    static of(json: ClienteJson) {
        return new this(json.id, json.cpf, json.nome, new Date(json.dataNascimento));
    }
}

export type ClienteJson = {
	id: number;
    cpf: string;
    nome: string;
    dataNascimento: string;
}