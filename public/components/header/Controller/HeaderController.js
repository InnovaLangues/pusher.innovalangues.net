(function() {
    'use strict';
    
    angular.module('myApp.header')
        
        // Controller
        .controller(
        	"HeaderController", 
        	function(
        		$scope,
                myAuthService

        	){
	            // Expose logout function
                $scope.logout = function() {
                    myAuthService.logout();
                    
            	}

                $scope.user = myAuthService.getUser();
        	}
        );
})();

