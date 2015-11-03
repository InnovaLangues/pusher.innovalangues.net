(function() {
    'use strict';
    
    angular.module('myApp.sidebar')
        
        // Controller
        .controller(
        	"SidebarController", 
        	function(
        		$scope,
                myAuthService

        	){
                $scope.user = myAuthService.getUser();
        	}
        );
})();

