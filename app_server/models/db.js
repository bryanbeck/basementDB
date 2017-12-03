var mongoose = require( 'mongoose' );
var dbURI = 'mongodb://localhost/basementDB';
if (process.env.NODE_ENV === 'production'){
	dbURI = 'mongodb://heroku_jnw4wb8n:k1a7v7a4966l6v9fkar4sguin0@ds129796.mlab.com:29796/heroku_jnw4wb8n'
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
	console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
	console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback){
	mongoose.connection.close(function (){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};
//for nodemon restarts
process.once('SIGUSR2', function () {
	gracefulShutdown('nodemon retsart', function (){
		process.kill(process.pid, 'SIGUSR2');
	});
});
//for app termination
process.on('SIGINT', function () {
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});
//for heroku app termination
process.on('SIGTERM', function() {
	gracefulShutdown('Heroku app shutdown', function() {
		process.exit(0);
	});
});

require('./media');