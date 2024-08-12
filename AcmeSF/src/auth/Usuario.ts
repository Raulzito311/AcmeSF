import { Permissao } from "./Permissao";

export class Usuario {

    constructor(readonly nome: string, readonly permissao: Permissao) { }

    static of(json: UsuarioJson) {
        return new this(json.nome, json.permissao as Permissao)
    }
}

export type UsuarioJson = {
    nome: string;
    permissao: string;
}