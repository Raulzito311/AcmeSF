<?php
class DateUtil {
    /**
     * ref: https://stackoverflow.com/questions/14504913/verify-valid-date-using-phps-datetime-class
     */
    public static function validateDate(string $dateTime): bool {
        $dateTime = DateTime::createFromFormat('Y#m#d H#i#s', $dateTime);

        $errors = DateTime::getLastErrors();
        
        if ($errors['warning_count'] > 0 || $errors['error_count'] > 0)
            return false;

        return $dateTime !== false;
    }
}
?>