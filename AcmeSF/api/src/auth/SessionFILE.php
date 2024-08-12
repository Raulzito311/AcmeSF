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

    public function registrarUsuario(UsuarioForSession $usuario) {
        session_regenerate_id(true);

        $_SESSION['nome'] = $usuario->nome;
        $_SESSION['permissao'] = $usuario->permissao;
    }

    public function buscarUsuarioRegistrado(): UsuarioForSession|bool {
        if (!isset($_SESSION['nome'])) {
            return false;
        }

        $usuario = new UsuarioForSession($_SESSION['nome'], $_SESSION['permissao']);

        return $usuario;
    }

    public function removerUsuario(): void {
        session_destroy();
        $_SESSION = array();
    }
}

?>