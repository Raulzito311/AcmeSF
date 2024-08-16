<?php

class SessionFILE implements Session {

    private function __construct() {
        session_name("sid");
        session_set_cookie_params(3600, null, null, null, true);
        session_start();
    }

    private static ?SessionFILE $session = null;

    public static function get(): SessionFILE {
        if (!SessionFILE::$session) {
            SessionFILE::$session = new SessionFILE();
        }
        return SessionFILE::$session;
    }

    public function registrarUsuario(Usuario $usuario) {
        session_regenerate_id(true);

        $_SESSION['id'] = $usuario->id;
        $_SESSION['nome'] = $usuario->nome;
        $_SESSION['permissao'] = $usuario->permissao;
    }

    public function buscarUsuarioRegistrado(): Usuario|bool {
        if (!isset($_SESSION['id'])) {
            return false;
        }

        $usuario = new Usuario($_SESSION['id'], $_SESSION['nome'], $_SESSION['permissao']);

        return $usuario;
    }

    public function removerUsuario(): void {
        session_destroy();
        $_SESSION = array();
    }
}

?>