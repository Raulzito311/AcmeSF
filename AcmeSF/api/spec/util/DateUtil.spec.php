<?php
require_once "vendor/autoload.php";

describe('DateUtil::validateDate', function() {
    it('returns true for a valid dateTime', function() {
        $dateTime = '2024-04-17 19:22:46';

        expect(DateUtil::validateDate($dateTime))->toBeTruthy();
    });
    it('returns false for an invalid dateTime', function() {
        $dateTime = '2024-04-77 99:22:46';

        expect(DateUtil::validateDate($dateTime))->toBeFalsy();
    });
});
?>