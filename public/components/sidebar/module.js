(function() {
    'use strict';

    angular
    	.module('myApp.sidebar', [])
	    .directive(
            'mySidebar', 
            function() {
			    return {
			    	templateUrl: 'components/sidebar/Partial/sidebar.html',
			  	    controller: 'SidebarController'
                };
        	}
	    );
})();