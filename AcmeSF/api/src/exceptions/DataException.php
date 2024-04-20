<?php
class DataException extends Exception {
    function __construct(string $message, \Throwable $previous = null) {
        parent::__construct($message, 400, $previous);
    }
}
?>