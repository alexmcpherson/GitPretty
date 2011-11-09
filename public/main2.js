$('document').ready(function(){
  var colors = [];

  window.gittr = {
    data:[],
    $content: $('#content'),
    repos: {},
    userColors: {},
    newCommits : [],

    step: function() {
      gittr.animate();
      if (gittr.data.length == 0) {clearInterval(mainLoop); return;}
      var today = gittr.data.shift();
      if (today && today.length == 0) {return;}
      gittr.checkRepos(today); //add new repo containers if needed
      gittr.addCommits(today);
    },

    animate: function() {
      _.each(gittr.newCommits, function(div){
        $(div).css({top:0,left:0,opacity:1});
      });
    },

    addCommits: function(day) {
      if (!day){return}
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
      if (!day){return}
      for (var i = 0, len = day.length; i < len; i++) {
        var repoName = day[i].repo;
        if (!gittr.repos[repoName]) {
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

  for (collection in window.data) {
    var thisCollection = window.data[collection];
    for (var i = 0; i < thisCollection.length; i++) {
      if (thisCollection[i] && thisCollection[i].length) {
        for (var j = 0, leng = thisCollection[i].length; j < leng; j++) {
          window.gittr.data[i] = window.gittr.data[i] || [];
          window.gittr.data[i].push(thisCollection[i][j]);
        };
      }
    };
  }

  var mainLoop = setInterval(gittr.step, 100);
})