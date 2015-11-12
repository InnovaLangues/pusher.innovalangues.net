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
                'Notification',
                'Tokens',
                'Apps',
            	function(
            		$scope, 
            		$stateParams,
                    Restangular,
                    Notification,
                    Tokens,
                    Apps
            	) {
                    Apps.get($stateParams.appGuid).then(function(data){
                        $scope.app = data;
                    });

                    $scope.addToken = function() {
                        Apps.one($stateParams.appGuid).all('tokens').post().then(function(data) {
                            $scope.app = data;
                            Notification.success('You have added a new token');
                        });
                    }

                    $scope.deleteToken = function(key) {
                        Apps.one($stateParams.appGuid).all('tokens').one(key).remove().then(function(data){
                            $scope.app = data;
                            Notification.success('You have deleted a token');
                        });
                    }
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