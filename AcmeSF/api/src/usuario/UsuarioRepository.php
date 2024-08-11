<?php

interface UsuarioRepository{
    function buscarUsuarioPelasCredenciais(Credenciais $credenciais): Usuario|false;
}

?>