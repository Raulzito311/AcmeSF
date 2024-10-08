export class Cliente {
    readonly id: number;
    readonly cpf: string;
    readonly nome: string;
    readonly dataNascimento: Date;
    readonly telefone: string;
    readonly email: string;
    readonly endereco: string;
    readonly limiteCredito: number;
    readonly limiteCreditoMaximo: number;
    readonly idade: number;

    constructor(id: number, cpf: string, nome: string, dataNascimento: Date, telefone: string, email: string, endereco: string, limiteCredito: number, limiteCreditoMaximo: number) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.limiteCredito = limiteCredito;
        this.limiteCreditoMaximo = limiteCreditoMaximo;

        const today = new Date();

        let idade = today.getFullYear() - this.dataNascimento.getFullYear();
        if (new Date(today.getFullYear(), today.getMonth(), today.getDate()) < new Date(today.getFullYear(), this.dataNascimento.getMonth(), this.dataNascimento.getDate()))
            idade--;

        this.idade = idade;
    }

    static of(clienteJson: ClienteJson): Cliente {
        return new Cliente(
            clienteJson.id ?? 0,
            clienteJson.cpf ?? '',
            clienteJson.nome ?? '',
            clienteJson.dataNascimento ? new Date(clienteJson.dataNascimento) : new Date(),
            clienteJson.telefone ?? '',
            clienteJson.email ?? '',
            clienteJson.endereco ?? '',
            clienteJson.limiteCredito ?? 0,
            clienteJson.limiteCreditoMaximo ?? 0
        );
    }
}

export type ClienteJson = {
	id?: number;
    cpf?: string;
    nome?: string;
    dataNascimento?: string;
    telefone?: string;
    email?: string;
    endereco?: string;
	limiteCredito?: number;
    limiteCreditoMaximo?: number;
}