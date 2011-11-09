$('document').ready(function(){
  var colors = [];

  window.gittr = {
    $content: $('#content'),
    repos: {},
    userColors: {},
    newCommits : [],

    step: function() {
      gittr.animate();
      if (year.length == 0) {clearInterval(mainLoop); return;}
      var today = year.shift();
      if (today.length == 0) {return;}
      gittr.checkRepos(today); //add new repo containers if needed
      gittr.addCommits(today);
      console.log('stepping');
    },

    animate: function() {
      _.each(gittr.newCommits, function(div){
        $(div).css({top:0,left:0,opacity:1});
      });
    },

    addCommits: function(day) {
      for (var i = 0, len = day.length; i < len; i++) {
        var commit = day[i];
        var classes = commit.classes.join(' ') + ' ' + 'commit';
        var styles = ['position:relative;top:',(Math.random()*1000),'px;left:',((Math.random()*2-1)*200),'px;'].join('');
        var div = $('<div class="'+ classes +'" style="' + styles + '" >');
        gittr.repos[commit.repo].append(div);
        gittr.newCommits.push(div);
      };
    },

    checkRepos: function(day) {
      for (var i = 0, len = day.length; i < len; i++) {
        var repoName = day[i].repo;
        if (!gittr.repos[repoName]) {
          console.log('new repo: ' + repoName);
          var repoContainer = gittr.addRepoContainer(repoName);
          gittr.repos[repoName] = repoContainer;
        }
      };
    },

    addRepoContainer: function(repoName) {
      var div = $('<div class="repo" id="'+repoName+'"><div class="brace">}</div></div>');
      gittr.$content.append(div);
      return div
    }
  };

  var mainLoop = setInterval(gittr.step, 100);
})