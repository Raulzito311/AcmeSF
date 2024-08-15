<?php

interface Session {
    public function registrarUsuario(Usuario $usuario);

    public function buscarUsuarioRegistrado(): Usuario|bool;

    public function removerUsuario();
}

?>