import { Cliente, ClienteJson } from "./Cliente";
import { API } from "../util/API";
import { Service } from "../util/Service";

class ClientesService implements Service<Cliente> {
    async buscarPeloId(id: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes/${id}`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const clienteJson: any = await res.json();

        const cliente: Cliente = Cliente.of(clienteJson);

        return cliente;
    }

    async buscarTodos(): Promise<Cliente[]> {
        const res = await fetch(`${API}/clientes`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const clientesJson: any[] = await res.json();

        const clientes: Cliente[] = clientesJson.map(clienteJson => Cliente.of(clienteJson));

        return clientes;
    }

    async buscarPeloCPF(cpf: number): Promise<Cliente> {
        const res = await fetch(`${API}/clientes?cpf=${cpf}`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const clienteJson: any = await res.json();

        const cliente: Cliente = Cliente.of(clienteJson);

        return cliente;
    }

    async adicionar(cliente: ClienteJson): Promise<void> {
        const params = {
            method : "POST",
            credentials: 'include' as RequestCredentials,
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(cliente)
        };
        
        const res = await fetch(`${API}/clientes`, params);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }
    }
}

export const clientesService = new ClientesService();