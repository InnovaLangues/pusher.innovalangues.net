/**
 * App service
 */
(function () {
    'use strict';

    angular.module('myApp.app').factory('AppService', [
        '$q',
        'Restangular',
        'Apps',
        function AppService($q, Restangular, Apps) {

            return {
                /**
                 * Get an apps
                 * @returns promise
                 */
                getApps: function () {

                    var deferred = $q.defer();

					Restangular.all('apps')
			        	.getList()
		        		.then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            console.log("Error with status code", response.status);
                        });

                    return deferred.promise;
                },

                /**
                 * Get an apps
                 * @returns promise
                 */
                addApp: function (slug) {

                    var deferred = $q.defer();

                    var app = {
                    	'slug' : slug
                    }

					Apps
						.post(app)
						.then(function (response) {
                            deferred.resolve(response);
                        }, function (response) {
                            console.log("Error with status code", response.status);
                        });

                    return deferred.promise;
                },

                /**
                 * Get an apps
                 * @returns promise
                 */
                deleteApp: function (guid) {

                    var deferred = $q.defer();

                    Apps
                    	.one(guid)
                    	.remove()
                    	.then(function(response) {
                        	deferred.resolve(response);
                        }, function (response) {
                            console.log("Error with status code", response.status);
                        });

                    return deferred.promise;
                }
            };
        }
    ]);
})();