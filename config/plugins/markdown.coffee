###
Overrides the default lineman-blog markdown settings. To see what the defaults
are, try running `lineman config markdown` or looking in:
  node_modules/lineman-blog/config/plugins/markdown.coffee
###
module.exports = (lineman) ->
  config:
    markdown:
      dev:
        options:
          url: "http://xxx"
      options:
        author: "Realschule Golzheim"
        title: "Homepage der Realschule Golzheim"
        description: ""
        url: "http://localhost:8000"
        layouts: 
          wrapper: "app/templates/wrapper.us"
          archive: "app/templates/blog.us"
        paths: 
          index: "index.html",
          archive: "blog.html",
          rss: "index.xml"
        rssCount: 10 #<-- remove, comment, or set to zero to disable RSS generation
        #disqus: "my_disqus_name" #<-- uncomment and set your disqus account name to enable disqus support
