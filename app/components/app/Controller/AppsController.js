(function() {
	'use strict';
	
	angular.module('myApp.app')

		// Apps controller
		.controller(
			'AppsController', 
			[
				'$scope', 
				'Restangular', 
				function(
					$scope, 
					Restangular
				) {
			        var baseApps = Restangular.all('apps');

			        baseApps.getList().then(function(apps) {
			          	$scope.apps = apps;
			        });        	
			    }
			]
		)
})();

