(function() {
    'use strict';

    angular.module('myApp.authentification', [])

    	// Configure
        .config([
            '$stateProvider', 
            function($stateProvider) {
                $stateProvider
                    .state(
                        'login', 
                        {
                            url: '/login',
                            templateUrl: "components/authentification/Partial/login.html",
                        	controller: "LoginController"
                        }
                    );
            }
        ]);
})();