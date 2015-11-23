(function() {
    'use strict';

    angular.module('myApp.authentification')

        // Controller
        .controller("LogoutController", function(
            myAuthService
        ){       
            myAuthService.logout();   
        });
})();