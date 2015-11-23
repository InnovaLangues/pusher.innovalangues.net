(function() {
    'use strict';

    angular
    	.module('myApp.header', [])
	    .directive(
            'myHeader', 
            function() {
			    return {
			    	templateUrl: 'components/header/Partial/header.html',
                    controller: 'HeaderController'
			  	};
        	}
	    );
})();