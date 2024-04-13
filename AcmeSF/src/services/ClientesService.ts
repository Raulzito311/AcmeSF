import { Cliente } from "../models/Cliente";
import { API } from "./API";
import { Service } from "./Service";

class ClientesService implements Service<Cliente> {
    async buscarPeloId(id: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes/${id}`);
        if (!res.ok)
            throw new Error("API de clientes indisponível");

        const clienteJson: any = await res.json();

        const cliente: Cliente = Cliente.of(clienteJson);

        return cliente;
    }

    async buscarTodos(): Promise<Cliente[]> {
        const res = await fetch(`${API}/clientes`);
        if (!res.ok)
            throw new Error("API de clientes indisponível");

        const clientesJson: any[] = await res.json();

        const clientes: Cliente[] = clientesJson.map(clienteJson => Cliente.of(clienteJson));

        return clientes;
    }
}

export const clientesService = new ClientesService();