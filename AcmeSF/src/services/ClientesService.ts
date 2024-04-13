import { Cliente } from "../models/Cliente";
import { API } from "./API";
import { Service } from "./Service";

class ClientesService implements Service<Cliente> {
    async buscarPeloId(id: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes/${id}`);
        if (!res.ok)
            throw new Error("API de clientes indisponível");

        const clientesJson: any = await res.json();

        const cliente: Cliente = new Cliente(clientesJson.id, clientesJson.cpf, clientesJson.nome, new Date(clientesJson.dataNascimento));

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

export const clientesService = new ClientesService();