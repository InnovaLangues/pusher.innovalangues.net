(function() {
    'use strict';

    angular.module('myApp.404', ['ui.router'])

        // Configure
        .config([
            '$stateProvider', 
            function($stateProvider) {
                $stateProvider
                    .state(
                        '404', 
                        {
                            url: '/404',
                            templateUrl: 'components/404/Partial/404.html' 
                        }
                    );
            }
        ]);
})();