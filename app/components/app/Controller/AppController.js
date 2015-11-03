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
                'TokenService',
            	function(
            		$scope, 
            		$stateParams,
            		Restangular,
                    TokenService
            	) {
                    var baseApp = Restangular.one('apps', $stateParams.appGuid);

                    baseApp.get().then(function(app) {
                      $scope.app = app;
                    });

                    $scope.addToken = TokenService.addToken;

                    $scope.tokens = TokenService.list;
                    //console.dir(TokenService);
                }
            ]
        ).factory(
            'TokenService',
            [
                'Restangular',
                function(Restangular)
                {
                    var factory = {};

                    
                        factory.list = [
                            {
                                key: "toto",
                                secret: "titi"
                            },
                            {
                                key: "tutu",
                                secret: "kiki"
                            }
                        ];

                        factory.addToken = function() {
                            factory.list.push({
                                key: "tata",
                                secret: "tsts"
                            });
                        };

                        factory.getTokens = function() {
                            var baseApp = Restangular.one('apps', $stateParams.appGuid);

                            baseApp.get().then(function(tokens) {
                              factory.list = tokens;
                            });
                        };
                   
                    //console.dir(factory);
                    return factory;
                }
            ]
        );
})();