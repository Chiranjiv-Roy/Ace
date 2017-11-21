$(window).on('load',function(){
  
  var OldText = "";
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  
  var dmplib = require("diff_match_patch");
  var dmp = new dmplib.diff_match_patch();

  var socket = io.connect();

  editor.on('change', function (data) {
    var NewText = editor.getSession().getValue();
        console.log(NewText);
    });




      socket.emit('diff', $('#btn-input').val());
    socket.on('patch', (message) => addLi(message));
    

});