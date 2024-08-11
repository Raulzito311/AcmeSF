<?php
require_once "vendor/autoload.php";

class UsuarioRepositoryBDR implements UsuarioRepository {
    private PDO $pdo;

    public function __construct() {
        $this->pdo = Connection::get();
    }

    public function buscarUsuarioPelasCredenciais(Credenciais $credenciais): Usuario|false {
        try{
            $ps = $this->pdo->prepare('SELECT id, nome, username, email, senha, permissao FROM usuario WHERE (username = :login OR email = :login) AND senha = :senha');
            $ps->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, EmprestimoDTO::class);
            $ps->execute([':login' => $credenciais->login, ':senha' => $credenciais->senha]);

            $dto = $ps->fetchObject(UsuarioDTO::class);
            
            return $dto ? Usuario::of($dto) : $dto;
        }catch(PDOException $e){
            throw new RepositoryException("Erro ao consultar usuario pelas credenciais | " . $e->getMessage());
        }
    }
}
?>