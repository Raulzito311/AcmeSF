<?php
require_once "vendor/autoload.php";

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

abstract class View {

    protected HttpRequest $req;
    protected HttpResponse $res;

    function __construct(HttpRequest $req, HttpResponse $res) {
        $this->req = $req;
        $this->res = $res;
    }

    // Input

    public function readParam(string $param): string|null {
        return $this->req->param($param);
    }

    public function readId(): string {
        return $this->readParam('id');
    }

    // Output

    public function write($obj, int $status = 200): void {
        $this->res->status($status)->json($obj);
    }

    public function writeAll(array $objs): void {
        $this->res->status(200)->json($objs);
    }

    public function created(): void {
        $this->res->status(201)->end();
    }
    
    public function noContent(): void {
        $this->res->status(204)->end();
    }

    public function notFound(string $message = null): void {
        $this->error(404, $message);
    }

    public function error(int $errorCode, string $message = null): void {
        $this->res->status($errorCode);
        if (isset($message)) {
            $this->res->send($message);
            return;
        }
        $this->res->end();
    }
}

?>