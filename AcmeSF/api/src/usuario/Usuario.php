<?php

class Usuario {
    public function __construct(
        public readonly string $nome,
        public readonly Permissao $permissao) { }

    public static function of(UsuarioDTO $dto): Usuario {
        return new Usuario($dto->nome, Permissao::from($dto->permissao));
    }
}

?>