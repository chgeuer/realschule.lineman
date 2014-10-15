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
	var app = lineman.config.application;

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
		'replace': { 
			'generated': {
				'src': ['generated/*.html'],
				'replacements': [
					{ 'from': "ä", 'to': '&auml;' },
					{ 'from': "ö", 'to': '&ouml;' },
					{ 'from': "ü", 'to': '&uuml;' },
					{ 'from': "Ä", 'to': '&Auml;' },
					{ 'from': "Ö", 'to': '&Ouml;' },
					{ 'from': "Ü", 'to': '&Uuml;' },
					{ 'from': "ß", 'to': '&szlig;' }
				],
				'overwrite': true
			},
			'dist': {
				'src': ['dist/*.html'],
				'replacements': [
					{ 'from': "ä", 'to': '&auml;' },
					{ 'from': "ö", 'to': '&ouml;' },
					{ 'from': "ü", 'to': '&uuml;' },
					{ 'from': "Ä", 'to': '&Auml;' },
					{ 'from': "Ö", 'to': '&Ouml;' },
					{ 'from': "Ü", 'to': '&Uuml;' },
					{ 'from': "ß", 'to': '&szlig;' }
				],
				'overwrite': true
			}
		},
		'appTasks' : {
			'deploy': ['ftpush:prod']
		},
		'appendTasks': {
			'common': app.appendTasks.common.concat('replace')
		}
	};
};