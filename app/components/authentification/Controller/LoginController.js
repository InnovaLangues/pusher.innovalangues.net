(function() {
    'use strict';

    angular.module('myApp.authentification')

        // Controller
        .controller("LoginController", function(
            $scope, 
            myAuthService
        ){       
            $scope.login = function(user){
                myAuthService.login(user);
            }
        });
})();