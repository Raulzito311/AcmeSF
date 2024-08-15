<?php

class AuthUtil {
    private static string $hashKey = '41g0ritm8!s3gUr0#';

    static function gerarHash(string $senha, string $sal): string {
        return hash_hmac('sha256', $sal . $senha, AuthUtil::$hashKey);
    }

    static function addPepper(string $senha): string {
        return '%¨|}#' . $senha . '&@)/({';
    }
}

?>