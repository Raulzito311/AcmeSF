<?php

interface Session {
    public function registrarUsuario(UsuarioForSession $usuario);

    public function buscarUsuarioRegistrado(): UsuarioForSession|bool;

    public function removerUsuario();
}

?>