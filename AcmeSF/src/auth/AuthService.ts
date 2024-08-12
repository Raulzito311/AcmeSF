import { API } from "../util/API";
import { Cookie } from "./Cookie";
import { Credenciais } from "./Credenciais";
import { Usuario } from "./Usuario";

class AuthService {
    private usuarioLogado: Usuario|null = null;

    public getUsuarioLogado() {
        return this.usuarioLogado;
    }

    async login(credenciais: Credenciais): Promise<void> {

        // TODO: Hash na senha

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

        const usuario: Usuario = Usuario.of(usuarioJson);

        this.usuarioLogado = usuario;

        Cookie.find('sid');
    }

    async logout(): Promise<void> {
        const params = {
            method : 'POST',
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