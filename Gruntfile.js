/*global module:false*/
module.exports = function(grunt) {
  // grunt.loadNpmTasks("grunt-markdown-blog");
  grunt.loadNpmTasks("grunt-ftpush");
  require('./config/lineman').config.grunt.run(grunt);
};