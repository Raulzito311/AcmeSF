<?php
class RepositoryException extends Exception {
    function __construct(string $message, \Throwable $previous = null) {
        parent::__construct($message, 500, $previous);
    }
}
?>