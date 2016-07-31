var http = require('http'),
	connect = require('connect'),
	serveStatic = require('serve-static');
	app = connect();

app.use(serveStatic(__dirname + '/public'));

http.createServer(app).listen(3000, function () {
	console.log('server is live on port 3000!');
});