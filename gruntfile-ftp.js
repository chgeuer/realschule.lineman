'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		'pkg': grunt.file.readJSON("package.json"),
		'ftpush' : {
			'prod' : {
				'auth' : {
					'host' : 'schulen.duesseldorf.de',
					'port' : 21,
					'authKey' : 'schulenduesseldorfde'
				},
				'src' : 'dist',
				'dest' : '/httpdocs/v5',
				'exclusions' : [
					'path/to/source/folder/**/.DS_Store', 
					'path/to/source/folder/**/Thumbs.db', 
					'path/to/dist/tmp'
				]
			}
		},
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-ftp-deploy");
	grunt.loadNpmTasks("grunt-ftpush");

	grunt.registerTask("ftp", ["ftpush:prod"]);
};