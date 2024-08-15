<?php

use phputil\traits\WithBuilder;

class UsuarioDTO {

    use WithBuilder;
    
    public readonly string $nome;
    public readonly string $permissao;
}

?>