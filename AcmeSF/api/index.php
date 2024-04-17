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
                        $controller = new FormaDePagamentoController($view, repositoryFormaDePagamento);
                        $controller->buscarTodos();
                    })
                    ->get( '/:id', function( $req, $res ) {
                        $view = new FormaDePagamentoView($req, $res);
                        $controller = new FormaDePagamentoController($view, repositoryFormaDePagamento);
                        $controller->buscarPeloId();
                    })
                    ->end()
                ->route('/emprestimos')
                    ->get( '/', function( $req, $res ) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view, repositoryEmprestimo);
                        $controller->buscarTodos();
                    })
                    ->post( '/', function( $req, $res ) {
                        $view = new EmprestimoView($req, $res);
                        $controller = new EmprestimoController($view, repositoryEmprestimo);
                        $controller->adicionar();
                    })
                    ->end()
                ->route('/clientes')
                    ->get( '/', function( $req, $res ) {
                    })
                    ->get( '/:id', function( $req, $res ) {
                    })
                    ->end();
        return $app;
    }
}

const repositoryFormaDePagamento = new FormaDePagamentoRepositoryBDR();
const repositoryEmprestimo = new EmprestimoRepositoryBDR();

$app = App::getRouter();

$app->listen();

?>