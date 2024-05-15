/**
* PasswordChecker.js
* A simple password checker game.
*/

(function (document, $) {

    'use strict';

    /**
    * Initializes the PasswordCheckerGame object.
    *
    * @api private
    */
    var PasswordCheckerGame = function() {

        /**
        * Check if the password matches the criteria.
        *
        * @param {String} password: The password to check
        * @returns {Boolean}: True if the password is strong, false otherwise
        */
        var isStrongPassword = function(password) {
            // Password criteria: at least 8 characters long and contains a mix of letters, numbers, and special characters
            var regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            return regex.test(password);
        };

        /**
        * Updates the UI to show the result of the password check.
        *
        * @param {Boolean} isStrong: True if the password is strong, false otherwise
        */
        var updateResult = function(isStrong) {
            if (isStrong) {
                $('#result').text('Strong password!');
                $('#result').addClass('strong');
                $('#result').removeClass('weak');
            } else {
                $('#result').text('Weak password! Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.');
                $('#result').addClass('weak');
                $('#result').removeClass('strong');
            }
        };

        /**
        * Event handler for password input change.
        * Checks the strength of the entered password.
        */
        var handlePasswordChange = function() {
            var password = $(this).val();
            var isStrong = isStrongPassword(password);
            updateResult(isStrong);
        };

        return {

            /**
            * Initializes the password checker game.
            *
            * @param {String} passwordInputId: The ID of the password input field
            * @param {String} resultElementId: The ID of the element to display the result
            */
            init: function(passwordInputId, resultElementId) {
                $(document).ready(function() {
                    $('#' + passwordInputId).on('input', handlePasswordChange);
                    updateResult(false); // Initially show as weak password
                });
            }
        };
    };


    /**
    * Allow game to be used within the browser
    */
    window.passwordchecker = PasswordCheckerGame();

}(document, jQuery));


// Example usage:
$(function() {
    // Initialize the password checker game
    passwordchecker.init('passwordInput', 'result');
});
