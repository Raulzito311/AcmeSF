<?php
require_once "vendor/autoload.php";

class AuthController {
    private AuthView $view;
    private UsuarioRepository $repository;
    private Session $session;

    function __construct(AuthView $view) {
        $this->view = $view;
        $this->session = SessionFILE::get();
        
        try {
            $this->repository = new UsuarioRepositoryBDR();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode());
        }
    }

    // TODO: Implementar Hash SHA 256 com pepper e salt na senha
    public function login(): void {
        try {
            $credenciais = $this->view->read();
        } catch (DataException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        } catch (TypeError $e) {
            $this->view->error(400, 'You must provide a JSON body for this request.');
            return;
        }
        try {
            $usuario = $this->repository->buscarUsuarioPelasCredenciais($credenciais);
            if (!$usuario) {
                $this->view->unauthorized();
                return;
            }
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
            return;
        }
        
        $usuarioForSession = new UsuarioForSession($usuario->nome, $usuario->permissao);
        
        $this->session->registrarUsuario($usuarioForSession);

        
        $this->view->loginSuccess($usuarioForSession);
    }

    public function logout(): void {
        $this->session->removerUsuario();
    }

    public function estaLogado(bool $retornarErro = false): bool {
        $usuario = $this->session->buscarUsuarioRegistrado();

        if (!$usuario) {
            if ($retornarErro) $this->view->unauthorized();
            return false;
        }

        return true;
    }

    public function estaLogadoGerente(bool $retornarErro = false): bool {
        $usuario = $this->session->buscarUsuarioRegistrado();

        if (!$usuario) {
            if ($retornarErro) $this->view->unauthorized();
            return false;
        }

        if ($usuario->permissao !== Permissao::GERENTE) {
            if ($retornarErro) $this->view->accessDenied();
            return false;
        }

        return true;
    }

}

?>