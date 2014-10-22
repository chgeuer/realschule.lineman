/*global module:false*/
module.exports = function(grunt) {
  // grunt.loadNpmTasks("grunt-markdown-blog");
  grunt.loadNpmTasks("grunt-ftpush");
  grunt.loadNpmTasks("grunt-text-replace");

  require('./config/lineman').config.grunt.run(grunt);
};