(function() {
    'use strict';

    angular.module('myApp.app', [])
    
        .config(['$stateProvider', 
            function($stateProvider) {
                $stateProvider
                    // App abstract route 
                    .state("apps", {
                        abstract: true,
                        url: '/apps',
                        templateUrl: "components/app/Partial/apps.html",

                    })
                    // App list
                    .state("apps.list", {
                        url: "",
                        templateUrl: "components/app/Partial/apps.list.html",
                        controller: "AppsController",
                        /*resolve: {
                            apps: function(AppService) {
                                return AppService.list();
                            }
                        },*/
                        data: {
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            }
                        }
                    })

                    // App detail
                    .state("apps.detail", {
                        url: "/{appGuid}",
                        templateUrl: "components/app/Partial/apps.detail.html",
                        controller: "AppController",
                        /*resolve: {
                            app: function($stateParams, AppService) {
                                return AppService.get($stateParams.appGuid);
                            }
                        },*/
                        data: {
                            permissions: {
                                except: ['anonymous'],
                                redirectTo: 'login'
                            }
                        }
                    });
                }
            ]);
})();