var winston = require( 'winston' );
var config = require( 'config' );
var lodash = require( 'lodash' );

var Mail = require('winston-mail').Mail;

// Read transports from config
var transports = [];
winston.config.cli.levels['critical'] = 10
lodash.each(config.winston, function(transportsDetails, type) {
	function createTransport(transport) {
		transport = new (winston.transports[type])(transport);
		transports.push(transport);
	}
	if(lodash.isArray(transportsDetails)){
		lodash.each(transportsDetails, createTransport);
	} else {
		createTransport(transportsDetails);
	}
});
var logger = new (winston.createLogger)({
  transports: transports,
  exceptionHandlers: [ new winston.transports.Console() ]
});
logger.setLevels(winston.config.cli.levels);
var exp = module.exports = logger;