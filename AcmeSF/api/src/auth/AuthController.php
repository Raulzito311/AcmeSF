<?php
require_once "vendor/autoload.php";

class AuthController {
    private AuthView $view;
    private UsuarioRepository $repository;
    private Session $session;

    function __construct(AuthView $view, Session $session) {
        $this->view = $view;
        $this->session = $session;
        
        try {
            $this->repository = new UsuarioRepositoryBDR();
        } catch (RepositoryException $ex) {
            $this->view->error($ex->getCode(), $ex->getMessage());
        }
    }

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
        
        $this->session->registrarUsuario($usuario);

        
        $this->view->loginSuccess($usuario->withoutId());
    }

    public function logout(): void {
        $this->session->removerUsuario();
        $this->view->noContent();
    }

    public function buscarUsuarioRegistrado(): void {
        $usuario = $this->session->buscarUsuarioRegistrado();

        if (!$usuario) {
            $this->view->unauthorized();
            return;
        }

        $this->view->write($usuario->withoutId());
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