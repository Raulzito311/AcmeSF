<?php

class Usuario {
    public function __construct(
        public readonly int $id,
        public readonly string $nome,
        public readonly string $username,
        public readonly string $email,
        public readonly string $senha,
        public readonly Permissao $permissao) { }

    public static function of(UsuarioDTO $dto): Usuario {
        return new Usuario($dto->id, $dto->nome, $dto->username, $dto->email, $dto->senha, Permissao::from($dto->permissao));
    }
}

?>