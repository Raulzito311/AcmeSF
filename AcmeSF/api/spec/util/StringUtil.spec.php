<?php
require_once "vendor/autoload.php";

describe('StringUtil::validateDateTime', function() {
    it('returns true for a valid dateTime', function() {
        $dateTime = '2024-04-17 19:22:46';

        expect(StringUtil::validateDateTime($dateTime))->toBeTruthy();
    });
    it('returns false for an invalid dateTime', function() {
        $dateTime = '2024-04-77 99:22:46';

        expect(StringUtil::validateDateTime($dateTime))->toBeFalsy();
    });
});

describe('StringUtil::validateDate', function() {
    it('returns true for a valid date', function() {
        $date = '2024-04-17';

        expect(StringUtil::validateDate($date))->toBeTruthy();
    });
    it('returns false for an invalid date', function() {
        $date = '2024-04-77';

        expect(StringUtil::validateDate($date))->toBeFalsy();
    });
});

describe('StringUtil::validateCpf', function() {
    it('returns true for a valid cpf format', function() {
        $cpf = '062.148.367-25';

        expect(StringUtil::validateCpf($cpf))->toBeTruthy();
    });
    it('returns false for an invalid cpf format', function() {
        $cpf = '06214836725';

        expect(StringUtil::validateCpf($cpf))->toBeFalsy();
    });
});

describe('StringUtil::validateEmail', function() {
    it('returns true for a valid email format', function() {
        $email = 'raulmff@gmail.com';

        expect(StringUtil::validateEmail($email))->toBeTruthy();
    });
    it('returns false for an invalid email format', function() {
        $email = 'raulmffgmail.com';

        expect(StringUtil::validateEmail($email))->toBeFalsy();
    });
});
?>