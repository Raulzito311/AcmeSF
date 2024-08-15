<?php
require_once "vendor/autoload.php";

describe('AuthUtil', function() {
    it('hashes the password as expected', function() {
        $senha = AuthUtil::gerarHash(AuthUtil::addPepper('123456'), 'B#z7&bK5Vdk-zFVb_@+#');
        
        expect($senha)->toBe('8f7ddbbd6cd52be44252d1d27470fcb8aa0e6bc492b311f23248c7d421c6ce06');
    });
    it('hashes the password as expected for admin', function() {
        $senha = AuthUtil::gerarHash(AuthUtil::addPepper('admin#'), '6-kQ3Q-&pw9Rc#WEnw4v');
        
        expect($senha)->toBe('be8b217cfcc99f6d0dd78e5c13f25b243bd4f2fa46392d09a9268b2f3573d5d0');
    });
});
?>