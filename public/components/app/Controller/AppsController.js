(function() {
    'use strict';
    
    angular.module('myApp.app')

        // Apps controller
        .controller(
            'AppsController', 
            [
                '$scope', 
                'Notification',
                'AppService',
                'apps',
                function(
                    $scope, 
                    Notification,
                    AppService,
                    apps
                ) {
                    $scope.apps = apps;

                    $scope.addApp = function() {
                        AppService.addApp($scope.slug).then(function (app) {
                            $scope.apps.push(app);
                            delete $scope.slug;
                        });
                        Notification.success('You have added a new app');
                    }

                    $scope.deleteApp = function(app) {
                        AppService.deleteApp(app.guid).then(function () {
                            var index = $scope.apps.indexOf(app);
                            $scope.apps.splice(index, 1);
                        });
                        Notification.success('You have deleted an app (' + app.slug + ')');
                    }
                }
            ]
        )
})();

