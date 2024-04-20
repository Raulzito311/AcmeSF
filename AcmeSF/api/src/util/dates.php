<?php
class DateUtil {
    /**
     * ref: https://stackoverflow.com/questions/14504913/verify-valid-date-using-phps-datetime-class
     */
    public static function validateDate($date) {
        var_dump($date);
        echo 'validar data ' . $date . PHP_EOL;
        $dateTime = DateTime::createFromFormat('Y-m-d H-i-s', $date);

        $errors = DateTime::getLastErrors();
        var_dump($errors);
        if (!empty($errors['warning_count'])) {
            return false;
        }

        return $dateTime !== false;
    }
}
?>