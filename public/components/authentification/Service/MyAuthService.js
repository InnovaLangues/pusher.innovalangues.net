(function() {
    'use strict';

    angular
        .module('myApp.authentification')
        .factory(
            'myAuthService', 
            [
                '$localStorage',
                '$http',
                '$state',
                'Restangular',
                'authService',
                'Notification',
                'myConfig',
                function(
                    $localStorage,
                    $http,
                    $state,
                    Restangular,
                    authService,
                    Notification,
                    myConfig
                ) {
                    var factory = {};

                    factory.getUser =function() {
                        if (null === $localStorage.user || typeof($localStorage.user) === 'undefined') {
                            $localStorage.user = {};
                        }

                        return $localStorage.user;
                    }

                    // Logout function
                    factory.logout = function() {
                        
                        // Remove all Restangular headers.
                        Restangular.setDefaultHeaders();
                        
                        // Delete user from local storage.
                        delete $localStorage.user.username;
                        delete $localStorage.user

                        // Change state to login.
                        $state.go('login');

                        // Notify user that he has been logged out.
                        Notification.success('You have successfully logged out.');
                    }

                    // Login function
                    factory.login = function(form) {
                        
                        // Get config data
                        var data = JSON.stringify({
                            grant_type: "password",

                            // Get these from a config file.
                            client_id: myConfig.oAuthClientId,
                            client_secret: myConfig.oAuthClientSecret,
                            
                            username: form.username,
                            password: form.password
                        });

                        // Post data to OAuth2 token endpoint.
                        $http
                            .post(
                                // Get this from a config file
                                myConfig.oAuthTokenUrl, 
                                data
                            )
                            .then(
                                function(response) {

                                    // Save username
                                    $localStorage.user.username = form.username;
                                    
                                    // Save token
                                    $localStorage.access_token = response.data.access_token,

                                    // Set authorisation headers
                                    Restangular.setDefaultHeaders({
                                        Authorization: 'Bearer ' + $localStorage.access_token
                                    });

                                    // Confirm login
                                    authService.loginConfirmed();

                                    // Change state to apps.
                                    $state.go('apps.list');

                                    // Notify the user that he has sucessfully logged in
                                    Notification.success('You have sucessfully logged in');

                                },

                                function(error) {

                                    // TODO : Handle different errors...
                                    Restangular.setDefaultHeaders({'Bearer': ''});

                                    // Delete user ant token from local storage
                                    delete $localStorage.user.username;
                                    delete $localStorage.access_token;

                                    // Notify user that an error has occured
                                    Notification.error('Wrong credentials');
                                }
                            );

                        // GENERATE Fake date for user
                        $http.get('https://randomuser.me/api/').then(function(response){
                            var fakeUser = response.data.results[0].user;
                            $localStorage.user = {};
                            $localStorage.user.firstname = fakeUser.name.first;
                            $localStorage.user.lastname = fakeUser.name.last;
                            $localStorage.user.avatar = fakeUser.picture.thumbnail;
                        });
                    }

                    return factory;
                }
            ]
        );
})();