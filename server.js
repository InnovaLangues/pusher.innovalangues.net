console.log('Starting application');

var http    = require('http'),
    faye    = require('faye'),
    md5     = require('md5'),
    crypto  = require('crypto'),
    request = require('request'),
    express = require('express'),
    app     = express();  

//Setup
app.use(express.static(__dirname + '/app'));  

console.log('Loaded dependancies');

server = http.createServer(app),
bayeux = new faye.NodeAdapter({mount: '/ws', timeout: 45});

bayeux.attach(server);
    
var checkIntegrity = {
  incoming: function(message, req, callback) {

  	console.log('Checking data integrity');

  	var url = req.url

    console.log('Requested URL : ' + url);

  	var pathArray = url.split("?");
  	var basePath = pathArray[0];

    console.log('Base path : ' +  pathArray[0]);
    
  	var paramString = pathArray[1];

    console.log('Parameters : ' +  pathArray[1]);

  	var params = parseQueryString(paramString);
  	var timestamp = params['timestamp'];

  	console.log('Timestamp : ' + timestamp);

  	var hash = params['hash'];

  	console.log('Body md5 hash : ' + hash);

  	var key = params['key'];

  	console.log('Key : ' + key);

  	var signature = params['signature'];

  	console.log('Signature : ' + signature);

  	var appId = basePath.split("/")[2];

  	console.log('App ID : ' + appId);

    //Check timestamp
    var now = Date.now() / 1000 | 0;
    var timeDiff = now - timestamp;
    if (timeDiff > 600) {
    	console.log('Timestamp expired');
    	message.error = 'Timestamp expired';
    } else {
    	console.log('Timestamp OK');	
    }

	request('http://localhost:3000/apps/1', function (error, response, body) {
	    var apiApp = null;
		
	  	if (!error && response.statusCode == 200) {
	    	console.log('Returned body from API : ' + body);

	    	apiApp = JSON.parse(body, true);

	    	var apiTokens = apiApp.tokens.filter(function(token) {
			    return token.key == key;
			});

			var apiToken = apiTokens[0];

			if (apiToken) {

			  	if (key !== apiToken.key) {
			    	console.log('Invalid key : ' + key + ' != ' + apiToken.key);
			    	message.error = 'Invalid key';
			    }

			    if (parseInt(apiApp.id) !== parseInt(appId)) {
			    	console.log('Invalid app id : ' + parseInt(apiApp.id) + ' != ' + parseInt(appId));
			    	message.error = 'Invalid app id';
			    }

			    var stringToSign = req.method + "\n" + basePath + "\n" + "key=" + key + "&timestamp=" + timestamp;

			    console.log("String to sign : \n" + stringToSign + "\n");
			    
			    var hmac = null;
			    hmac = crypto.createHmac('sha256', apiToken.secret).update(stringToSign).digest('hex')

			    if (signature !== hmac) {
			    	console.log("Invalid Signature : \n" + signature + "!=\n" + hmac);
			    	message.error = 'Invalid Signature';
			    }

			    if (hash !== md5(req.body)) {
			    	console.log('Invalid hash');
			    	message.error = 'Invalid hash';
			    }

			    console.log('Everything is OK, sending the message!');

			} else {
				console.log('Token not found');
				message.error = 'Token not found';
			}

	    	callback(message);
	  	} else {
			message.error = error;
			console.log(error);
			callback(message);
	  	}
	});
  }
};

bayeux.addExtension(checkIntegrity);

app.get('/', function(req, res) {
	console.log('Loading frontend');
    res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

var port = process.env.PORT || 8001;
server.listen(port, function() {
    console.log('Listening on ' + port);
});

var parseQueryString = function( queryString ) {
    var params = {}, queries, temp, i, l;
 
    // Split into key/value pairs
    queries = queryString.split("&");
 
    // Convert the array of strings into an object
    for ( i = 0, l = queries.length; i < l; i++ ) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
 
    return params;
};