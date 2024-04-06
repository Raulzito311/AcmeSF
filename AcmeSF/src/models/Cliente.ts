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
}