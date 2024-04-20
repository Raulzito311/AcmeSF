<?php
require_once 'vendor/autoload.php';

use phputil\router\Router;

use function phputil\cors\cors;

class App {
    public static function getRouter(): Router {
        $app = new Router();

        $app
            ->use( cors() )
                ->route('/formasDePagamento')
                    ->get( '/', function( $req, $res ) {
                        $view = new FormaDePagamentoView($req, $res);
                        $controller = new FormaDePagamentoController($view);
                        $controller->buscarTodos();
                    })
                    ->get( '/:id', function( $req, $res ) {
                        $view = new FormaDePagamentoView($req, $res);
                        $controller = new FormaDePagamentoController($view);
                        $controller->buscarPeloId();
                    })
                    ->end()
                ->route('/emprestimos')
                    ->get( '/', function( $req, $res ) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view);
                        $controller->buscarTodos();
                    })
                    ->get( '/:id', function( $req, $res ) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view);
                        $controller->buscarPeloId();
                    })
                    ->post( '/', function( $req, $res ) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view);
                        $controller->adicionar();
                    })
                    ->end()
                ->route('/clientes')
                    ->get( '/', function( $req, $res ) {
                        $view = new ClienteView($req, $res);
                        $controller = new ClienteController($view);
                        $controller->buscarTodos();
                    })
                    ->get( '/:id', function( $req, $res ) {
                        $view = new ClienteView($req, $res);
                        $controller = new ClienteController($view);
                        $controller->buscarPeloId();
                    })
                    ->end();
        return $app;
    }
}
?>