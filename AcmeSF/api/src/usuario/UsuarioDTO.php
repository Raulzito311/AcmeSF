<?php

use phputil\traits\WithBuilder;

class UsuarioDTO {

    use WithBuilder;
    
    public readonly int $id;
    public readonly string $nome;
    public readonly string $username;
    public readonly string $email;
    public readonly string $senha;
    public readonly string $permissao;
}

?>