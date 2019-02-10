var webshot = require('webshot');
var flatiron = require('flatiron');

var app = flatiron.app;

app.use(flatiron.plugins.http);

app.router.get('/getImage', function() {
	  var self = this;
	  var requestUrl = this.req.headers['head'];

	  var options = {
	  	streamType: 'jpeg',
		quality: 10
	  };

	  webshot(requestUrl, options, function(err, renderStream) {
	    renderStream.pipe(self.res);
	  });
	  
});

app.start(12001);

console.log('starting image server');
