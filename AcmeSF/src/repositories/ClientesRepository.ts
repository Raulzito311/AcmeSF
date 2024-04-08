import { Cliente } from "../models/Cliente";
import { API } from "./API";
import { Repository } from "./Repository";

export class ClientesRepository implements Repository<Cliente> {
    async buscarPeloId(id: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes?id=${id}`);
        if (!res.ok)
            throw new Error("API de clientes indisponível");

        const clientesJson: any[] = await res.json();

        const cliente: Cliente = new Cliente(clientesJson[0].id, clientesJson[0].cpf, clientesJson[0].nome, new Date(clientesJson[0].dataNascimento));

        return cliente;
    }

    async buscarTodos(): Promise<Cliente[]> {
        const res = await fetch(`${API}/clientes`);
        if (!res.ok)
            throw new Error("API de clientes indisponível");

        const clientesJson: any[] = await res.json();

        const clientes: Cliente[] = clientesJson.map(c => new Cliente(c.id, c.cpf, c.nome, new Date(c.dataNascimento)));

        return clientes;
    }
}