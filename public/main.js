$(document).ready(function(){
  max = _.max(_.flatten(gloomobile), function(arr){return arr && arr.magnitude}).magnitude;

  $content = $("#content");
  var i = 0;
  var colors = ['grey', 'tan', 'red', 'green', 'orange', 'blue', 'yellow', 'pink', 'purple', 'otherOrange', 'navy', 'magenta', 'olive', 'spring']
  var userColors= {};

  iterate = function() {
    today = gloomobile.shift();
    if (gloomobile.length == 0) {clearInterval(mainLoop);}

    if (today && today.length) { 
     // $content.empty()
      for (var i = 0, len = today.length; i < len; i++) {
        opacityClass = getOpacity(today[i].magnitude);

        username = today[i].username.replace(/\s+/, '');
        if (!userColors[username]) {userColors[username] = colors.shift()}
        $commit = $('<div/>', {
          class: [userColors[username], opacityClass, 'commit'].join(' '),
        })
        $content.prepend($commit);
      };
    }
  }

  getOpacity = function(val) {
    var opacity = val/max, opacityClass;
    opacity = Math.floor(opacity * 1000000) / 100;
    if (opacity > 1) {opacity = 1}
    if (opacity < .1) {opacity = .1}

    switch (true) {
      case (opacity <= .1):
        opacityClass = 'lightest';
        break;
      case (opacity <= .3):
        opacityClass = 'light'
        break;
      case (opacity <= .5):
        opacityClass = 'medium';
        break;
      case (opacity <= .8):
        opacityClass = 'dark';
        break;
      default:
        opacityClass = 'darkest';
    }
    return opacityClass
  }

  //var mainLoop = setInterval(iterate, 10)

})