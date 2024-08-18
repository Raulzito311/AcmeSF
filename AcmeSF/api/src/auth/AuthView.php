<?php

require_once "vendor/autoload.php";

class AuthView extends View {

    // Input

    public function read(): Credenciais {
        return Credenciais::of($this->req->body());
    }

    // Output

    public function loginSuccess($usuario): void {
        $this->write($usuario, 201);
    }

    public function unauthorized(): void {
        $this->error(401);
    }

    public function accessDenied(): void {
        $this->error(403);
    }
}

?>