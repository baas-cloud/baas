function init_ui() {
  var format;
  var formats = {
    mp3: { mime: "audio/mpeg",  ext: "mp3"},
    wav: { mime: "audio/x-wav", ext: "wav"}
  };

  for( var format in formats ) {
    format = formats[format];
    var myAudioTag = undefined; // Global
    var audioTagSupport = !!((myAudioTag = document.createElement('audio')).canPlayType);
    format.canPlayTag = audioTagSupport ? myAudioTag.canPlayType(format.mime) : "undefined";
    if( format.canPlayTag ) {
      $("#buttons a").each(
        function() {
          $(this).click( function() {
            var p = $(this).attr( "data-soundfile");
            window.history.pushState( p, p, "#" + p );
            play_sound( p + "." + format.ext );
          });
        }
      );

      if( window.location.hash )
        play_sound( window.location.hash.replace( /#/, '' ) + "." + format.ext );
      return;
    }
  }
  alert( "You're using a web browser that doesn't support audio. Try Chrome, Safari, or Firefox." );
}

function play_sound(sound) {
  if( ! sound )
    return;

  if( $('#audio').audivid("isplaying"))
    $('#audio').audivid("pause");

  $("#audio").replaceWith(
    $('<audio/>')
      .attr({ src : "./sounds/" + sound })
      .attr({ id : "audio" })
      .attr({ style : "display: none" })
  );
  $('#audio').audivid("play");
}

init_ui();
