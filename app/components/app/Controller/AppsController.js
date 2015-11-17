(function() {
	'use strict';
	
	angular.module('myApp.app')

		// Apps controller
		.controller(
			'AppsController', 
			[
				'$scope', 
				'Restangular',
				'Notification',
				'Apps',
				function(
					$scope, 
					Restangular,
					Notification,
					Apps
				) {
			        var baseApps = Restangular.all('apps');

			        baseApps.getList().then(function(apps) {
			          	$scope.apps = apps;
			        });      

			        $scope.addApp = function() {
			        	console.log($scope.slug);
			        	var app = {
			        		slug: $scope.slug
			        	};
                        Apps.post(app).then(function(data) {
                            baseApps.getList().then(function(apps) {
					          	$scope.apps = apps;
					        });  
                        	Notification.success('You have added a new app');
                        });
                    }

                    $scope.deleteApp = function(guid) {
                        Apps.one(guid).remove().then(function(data) {
                        	baseApps.getList().then(function(apps) {
					          	$scope.apps = apps;
					        });
                        	Notification.success('You have deleted the ' + guid + 'app');
                        });
                    }
			    }
			]
		)
})();

