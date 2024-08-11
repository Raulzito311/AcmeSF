<?php

class Credenciais {
    public readonly string $login;
    public readonly string $senha;

    public static function of(object $body): Credenciais {
		$credenciais = new Credenciais();
		
		if (isset($body->login) && isset($body->senha)) {
			try {
				$credenciais->login = $body->login;
			} catch (TypeError $ex) {
				throw new DataException('O login deve ser uma string (login)', $ex);
			}
			try {
				$credenciais->senha = $body->senha;
			} catch (TypeError $ex) {
				throw new DataException('A senha deve ser uma string (senha)', $ex);
			}
		} else {
			throw new DataException('O login e a senha devem ser informados.');
		}

		return $credenciais;
	}
}

?>