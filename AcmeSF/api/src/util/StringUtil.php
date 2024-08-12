<?php
class StringUtil {
    /**
     * ref: https://stackoverflow.com/questions/14504913/verify-valid-date-using-phps-datetime-class
     */
    public static function validateDateTime(string $dateTime): bool {
        $dateTime = DateTime::createFromFormat('Y#m#d H#i#s', $dateTime);

        $errors = DateTime::getLastErrors();
        
        if ($errors['warning_count'] > 0 || $errors['error_count'] > 0)
            return false;

        return $dateTime !== false;
    }

    public static function validateDate(string $date): bool {
        $date = DateTime::createFromFormat('Y#m#d', $date);

        $errors = DateTime::getLastErrors();
        
        if ($errors['warning_count'] > 0 || $errors['error_count'] > 0)
            return false;

        return $date !== false;
    }

    public static function validateCpf(string $cpf): bool {
        // TODO: validate if cpf is valid
        return preg_match('/\d{3}\.\d{3}\.\d{3}\-\d{2}/', $cpf);
    }

    public static function validateEmail(string $email): bool {
        return preg_match('/.+@.+\..+/', $email);
    }
}
?>