import { Cliente } from "./Cliente";
import { API } from "../util/API";
import { Service } from "../util/Service";

class ClientesService implements Service<Cliente> {
    async buscarPeloId(id: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes/${id}`);
        if (!res.ok) {
            const text = await res.text();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }

        const clienteJson: any = await res.json();

        const cliente: Cliente = Cliente.of(clienteJson);

        return cliente;
    }

    async buscarTodos(): Promise<Cliente[]> {
        const res = await fetch(`${API}/clientes`);
        if (!res.ok) {
            const text = await res.text();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }

        const clientesJson: any[] = await res.json();

        const clientes: Cliente[] = clientesJson.map(clienteJson => Cliente.of(clienteJson));

        return clientes;
    }

    async buscarPeloCPF(cpf: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes?cpf=${cpf}`);
        if (!res.ok) {
            const text = await res.text();
            throw `${res.status} ${res.statusText}${text.length > 0 ? ` - ${text}` : ''}`;
        }

        const clienteJson: any = await res.json();

        const cliente: Cliente = Cliente.of(clienteJson);

        return cliente;
    }
}

export const clientesService = new ClientesService();