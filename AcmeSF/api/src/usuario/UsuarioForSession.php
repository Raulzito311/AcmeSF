<?php

class UsuarioForSession {
    
    public function __construct(
        public readonly string $nome,
        public readonly Permissao $permissao = Permissao::PADRAO
    ) { }
    
}

?>