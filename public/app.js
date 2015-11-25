(function() {
    'use strict';

    var dependencies = [
        // App specific
        'myApp.config',
        'myApp.header',
        'myApp.sidebar',
        'myApp.footer',
        'myApp.404',
        'myApp.app',
        'myApp.authentification',

        // Plugins
        'restangular',
        'angular-loading-bar',
        'hljs',
        'ui.bootstrap',
        'ui-notification',
        'ui.router',
        'http-auth-interceptor',
        'ngStorage',
        'ngSanitize',
        'permission',
        'angularMoment',
        'mwl.confirm'
    ]

    // Declare app level module which depends on views, and components
    angular
        // My App
        .module('myApp', dependencies)

        // Config
        .config([
            '$stateProvider', 
            '$urlRouterProvider',
            '$locationProvider',
            'RestangularProvider', 
            'hljsServiceProvider', 
            'NotificationProvider',
            'myConfig',
            function(
                $stateProvider, 
                $urlRouterProvider,
                $locationProvider,
                RestangularProvider, 
                hljsServiceProvider, 
                NotificationProvider,
                myConfig
            ) {
                $stateProvider
                    // Define main state (homepage)
                    .state("home", {
                        url: "/",
                        templateUrl: "components/home/Partial/home.html"
                    });

                // Send 404 if page not found
                $urlRouterProvider
                    .otherwise('/404');

                // Define API base URL
                RestangularProvider
                    .setBaseUrl(myConfig.backendUrl);

                //Do I need this ?
                hljsServiceProvider;

                // Set options for displaying code
                hljsServiceProvider
                    .setOptions({
                    
                        // replace tab with 4 spaces
                        tabReplace: '    '
                    });

                // Configure notifications
                NotificationProvider.setOptions({
                    
                    // 5 seconds
                    delay: 5000
                });

                // use the HTML5 History API
                //$locationProvider.html5Mode(true);
        }])

        .directive(
            'main', 
            function(
                $localStorage, 
                $state,
                Notification, 
                Restangular
            ) {
                return {
                    restrict: 'C',

                    link: function(scope, elem, attrs) {

                        // Once Angular is started, remove class
                        elem.removeClass('waiting-for-angular');

                        // Set token
                        if(typeof $localStorage.access_token !== 'undefined') {
                            Restangular.setDefaultHeaders({Authorization: 'Bearer ' + $localStorage.access_token});
                        }
                    
                        // Listen for loginRequired event
                        scope.$on('event:auth-loginRequired', function() {     
                            
                            // Notify the user that he needs to log in
                            Notification.error('Sorry, you need to login!');
                            
                            // TODO: Open Modal for login.
                        });
                }
            }
        })

        .directive('prism', [function() {
            return {
                restrict: 'A',
                link: function ($scope, element, attrs) {
                    element.ready(function() {
                        Prism.highlightElement(element[0]);
                    });
                }
            }
        }])

        .run(
            function($rootScope, $state, $stateParams, $localStorage, Permission) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                
                // Define anonymous role
                Permission.defineRole('anonymous', function(stateParams) {
                    if (!$localStorage.user) {
                        return true;
                    }
                    return false;
                });
            }
        );
})();