// Generated by CoffeeScript 1.10.0
(function() {
  var account, etag, fetchRepos, minixhr, repos, request, showRepos;

  minixhr = require('minixhr');

  repos = '';

  etag = localStorage.getItem('etag');

  account = 'pepebecker';

  request = {
    url: "https://api.github.com/users/" + account + "/repos",
    method: 'HEAD'
  };

  minixhr(request, function(data, response, xhr, header) {
    if (etag !== header.Etag || localStorage.getItem('repos').length === 0) {
      localStorage.setItem('etag', header.Etag);
      return fetchRepos();
    } else {
      repos = JSON.parse(localStorage.getItem('repos'));
      return showRepos();
    }
  });

  fetchRepos = function() {
    return minixhr("https://api.github.com/users/" + account + "/repos", function(data, response, xhr, header) {
      localStorage.setItem('repos', data, null, 4);
      repos = JSON.parse(data);
      return showRepos();
    });
  };

  showRepos = function() {
    var content, description, i, j, name, ref, url;
    content = '';
    content = content + '<p>My GitHub Reposetories</p>\n';
    for (i = j = 0, ref = repos.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      name = repos[i].name;
      url = repos[i].html_url;
      description = 'no description available';
      if (repos[i].description !== null) {
        if (repos[i].description.length > 0) {
          description = repos[i].description;
        } else {
          description = 'no description available';
        }
      }
      if (repos[i].name === (account + ".github.io")) {
        description = 'This repo contains the source of this site';
      }
      content += "<li class='repo'><a href='" + url + "'>" + name + "</a><p class='discription'>" + description + "</p></li>\n";
    }
    return document.getElementById("repos").innerHTML = content;
  };

}).call(this);
