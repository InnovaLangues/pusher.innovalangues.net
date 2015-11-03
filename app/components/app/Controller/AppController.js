(function() {
    'use strict';

    angular.module('myApp.app')

        // App controller
        .controller(
            'AppController', 
            [
            	'$scope', 
            	'$stateParams', 
            	'Restangular',
                'Tokens',
                'Apps',
            	function(
            		$scope, 
            		$stateParams,
            		Restangular,
                    Tokens,
                    Apps
            	) {
                    Apps.get($stateParams.appGuid).then(function(data){
                        $scope.app = data;
                    });

                    var token = {
                        key: 111,
                        secret: 222
                    }

                    $scope.addToken = console.log('added token');
                    //Tokens.post(token);

                    //$scope.addToken = TokenService.addToken;

                    //$scope.tokens = TokenService.list;
                }
            ]
        ).factory(
            'Apps', 
            [
                'Restangular',
                function(Restangular)
                {
                    return Restangular.service('apps');
                }
            ]
        ).factory(
            'Tokens',
            [
                'Restangular',
                function(Restangular)
                {
                    return Restangular.service('tokens');
                }
            ]
        );
})();