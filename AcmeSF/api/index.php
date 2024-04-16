<?php
require_once 'vendor/autoload.php';

use phputil\router\Router;
use function phputil\cors\cors;

const repositoryFormaDePagamento = new FormaDePagamentoRepositoryBDR;

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
    ->route('/clientes')
        ->get( '/', function( $req, $res ) {
        })
        ->get( '/:id', function( $req, $res ) {
        })
        ->end()
    ->route('/emprestimos')
        ->get( '/', function( $req, $res ) {
        })
        ->post( '/', function( $req, $res ) {
        })
        ->end();

$app->listen();

?>