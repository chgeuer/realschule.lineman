/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by looking at:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/application.coffee
 *   - https://github.com/linemanjs/lineman/blob/master/config/plugins
 *
 * You can also ask about Lineman's config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */
module.exports = function(lineman) {
	return {
		'jshint': {
			'options': {
				'latedef': false
			}
		},
		'ftpush' : {
			'prod' : {
				'auth' : {
					'host' : 'schulen.duesseldorf.de',
					'port' : 21,
					'authKey' : 'schulenduesseldorfde'
				},
				'src' : 'dist',
				'dest' : '/httpdocs/v4',
				'exclusions' : [
					'path/to/source/folder/**/.DS_Store', 
					'path/to/source/folder/**/Thumbs.db', 
					'path/to/dist/tmp'
				]
			}
		},
		'appTasks' : {
			'deploy': ["ftpush:prod"]
		}
	};
};