/*global module:false*/
module.exports = function(grunt) {
  // grunt.loadNpmTasks("grunt-markdown-blog");
  require('./config/lineman').config.grunt.run(grunt);
};