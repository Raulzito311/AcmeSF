<?php
class DateUtil {
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