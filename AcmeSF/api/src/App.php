<?php
require_once 'vendor/autoload.php';

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;
use phputil\router\Router;

use function phputil\cors\cors;

class App {

    public static function getRouter(): Router {
        $app = new Router();

        // Middleware
        $precisaEstarLogado = function (HttpRequest $req, HttpResponse $res, bool &$stop = false) {
            $view = new AuthView($req, $res);
            $controller = new AuthController($view);
            $estaLogado = $controller->estaLogado(true);
    
            if (!$estaLogado) $stop = true;
        };

        // Middleware
        $precisaEstarLogadoGerente = function (HttpRequest $req, HttpResponse $res, bool &$stop = false) {
            $view = new AuthView($req, $res);
            $controller = new AuthController($view);
            $estaLogadoGerente = $controller->estaLogadoGerente(true);
            
            if (!$estaLogadoGerente) $stop = true;
        };

        $app
            ->use(function (HttpRequest $req, HttpResponse $res, bool &$stop = false) {
                SessionFILE::get();
            })
            ->use( cors(['origin' => 'http://localhost:5173', 'allowedHeaders' => 'content-type']) )
                ->route('/auth')
                    ->post('/login', function(HttpRequest $req, HttpResponse $res) {
                        $view = new AuthView($req, $res);
                        $controller = new AuthController($view);
                        $controller->login();
                    })
                    ->delete('/logout', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) { // TODO: Está dando erro de CORS
                        $view = new AuthView($req, $res);
                        $controller = new AuthController($view);
                        $controller->logout();
                    })
                    ->end()
                ->route('/formasDePagamento')
                    ->get( '/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new FormaDePagamentoView($req, $res);
                        $controller = new FormaDePagamentoController($view);
                        $controller->buscarTodos();
                    })
                    ->get( '/:id', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new FormaDePagamentoView($req, $res);
                        $controller = new FormaDePagamentoController($view);
                        $controller->buscarPeloId();
                    })
                    ->end()
                ->route('/emprestimos')
                    ->get( '/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view);
                        $controller->buscarTodos();
                    })
                    ->route('/:id')
                        ->get( '/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                            $view = new EmprestimoView($req, $res);
                            $controller = new EmprestimoController($view);
                            $controller->buscarPeloId();
                        })
                        ->route('/parcelas')
                            ->get('/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                                $view = new ParcelaView($req, $res);
                                $controller = new ParcelaController($view);
                                $controller->buscarParcelasDoEmprestimo();
                            })
                            ->end()
                        ->end()
                    ->post( '/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view);
                        $controller->adicionar();
                    })
                    ->end()
                ->route('/clientes')
                    ->get( '/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new ClienteView($req, $res);
                        $controller = new ClienteController($view);
                        $controller->buscarTodos();
                    })
                    ->get( '/:id', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new ClienteView($req, $res);
                        $controller = new ClienteController($view);
                        $controller->buscarPeloId();
                    })
                    ->post( '/', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new ClienteView($req, $res);
                        $controller = new ClienteController($view);
                        $controller->adicionar();
                    })
                    ->end();
        return $app;
    }
}
?>