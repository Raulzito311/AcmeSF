<?php
require_once "vendor/autoload.php";

describe('UsuarioRepositoryBDR', function() {
    beforeAll(function() {
        $sql = file_get_contents('dados.sql');
        Connection::get()->exec($sql);
    });
    it('retrieves Usuario by credenciais', function() {
        $repo = new UsuarioRepositoryBDR();

        $credenciais = (new Credenciais())->withLogin('raul')->withSenha('123456');

        $usuario = $repo->buscarUsuarioPelasCredenciais($credenciais);
        expect($usuario)->toBeAnInstanceOf(Usuario::class);
    });
    it('retrieves false by invalid credenciais', function() {
        $repo = new UsuarioRepositoryBDR();

        $credenciais = (new Credenciais())->withLogin('raul')->withSenha('12345');

        $usuario = $repo->buscarUsuarioPelasCredenciais($credenciais);

        expect($usuario)->toBeFalsy();
    });
});
?>