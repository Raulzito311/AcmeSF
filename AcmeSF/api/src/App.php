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
            $controller = new AuthController($view, SessionFILE::get());
            $estaLogado = $controller->estaLogado(true);
    
            if (!$estaLogado) $stop = true;
        };

        // Middleware
        $precisaEstarLogadoGerente = function (HttpRequest $req, HttpResponse $res, bool &$stop = false) {
            $view = new AuthView($req, $res);
            $controller = new AuthController($view, SessionFILE::get());
            $estaLogadoGerente = $controller->estaLogadoGerente(true);
            
            if (!$estaLogadoGerente) $stop = true;
        };

        $app
            ->use(cors(['origin' => 'http://localhost:5173', 'allowedHeaders' => 'content-type']))
                ->route('/auth')
                    ->post('/login', function(HttpRequest $req, HttpResponse $res) {
                        $view = new AuthView($req, $res);
                        $controller = new AuthController($view, SessionFILE::get());
                        $controller->login();
                    })
                    ->delete('/logout', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) { // TODO: Está dando erro de CORS
                        $view = new AuthView($req, $res);
                        $controller = new AuthController($view, SessionFILE::get());
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
                    ->put( '/simular', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view);
                        $controller->simular();
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
                                $controller = new ParcelaController($view, SessionFILE::get());
                                $controller->buscarParcelasDoEmprestimo();
                            })
                            ->put('/pagar', $precisaEstarLogado, function(HttpRequest $req, HttpResponse $res) {
                                $view = new ParcelaView($req, $res);
                                $controller = new ParcelaController($view, SessionFILE::get());
                                $controller->pagarParcela();
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