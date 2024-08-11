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
?>