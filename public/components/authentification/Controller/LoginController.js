(function() {
    'use strict';

    angular.module('myApp.authentification')

        // Controller
        .controller("LoginController", function(
            $rootScope, 
            $scope, 
            myAuthService
        ){       
            $rootScope.bodyClass = 'login-page';

            $scope.login = function(user){
                myAuthService.login(user);
            }
        });
})();