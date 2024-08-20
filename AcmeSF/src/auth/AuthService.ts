import { API } from "../util/API";
import { Credenciais } from "./Credenciais";
import { Usuario } from "./Usuario";

class AuthService {
    private usuarioLogado: Usuario|null = null; // Colocar em um cookie

    public async getUsuarioLogado(): Promise<Usuario> {
        console.log('Buscar usuário logado: ', this.usuarioLogado);
        
        if (this.usuarioLogado != null) return this.usuarioLogado;

        const res = await fetch(`${API}/auth`, { credentials: 'include' });
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const usuarioJson: any = await res.json();

        this.usuarioLogado = Usuario.of(usuarioJson);

        console.log('Usuário logado: ', this.usuarioLogado);

        return this.usuarioLogado;
    }

    async login(credenciais: Credenciais): Promise<void> {
        const params = {
            method: 'POST',
            credentials: 'include' as RequestCredentials,
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(credenciais)
        };
        
        const res = await fetch(`${API}/auth/login`, params);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        const usuarioJson: any = await res.json();

        this.usuarioLogado = Usuario.of(usuarioJson);
    }

    async logout(): Promise<void> {
        const params = {
            method : 'DELETE',
            credentials: 'include' as RequestCredentials
        };
        
        const res = await fetch(`${API}/auth/logout`, params);
        if (!res.ok) {
            const text = (await res.text()).trim();
            throw `${text.length > 0 ? text : `${res.status} ${res.statusText}`}`;
        }

        this.usuarioLogado = null;
    }
}

export const authService = new AuthService();