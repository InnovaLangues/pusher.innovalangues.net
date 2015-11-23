(function() {
    'use strict';

    angular
    	.module('myApp.footer', [])
	    .directive(
            'myFooter', 
            function() {
			    return {
			    	templateUrl: 'components/footer/Partial/footer.html',
			  	};
        	}
	    );
})();