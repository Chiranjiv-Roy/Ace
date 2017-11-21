$(window).on('load',function(){
  
  var OldText = "";
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  
  var dmp = new diff_match_patch();

  var socket = io.connect();

  editor.on('change', function (data) {
    var NewText = editor.getSession().getValue();
    var diff = dmp.diff_main(OldText,NewText);
    dmp.diff_cleanupSemantic(diff);
    OldText = NewText;
    socket.emit('diff', diff);
        console.log(diff);
    });
   
  socket.on('patch', (diff) => {
    var text = editor.getSession().getValue();
    var patch = dmp.patch_make(text, diff);
    var new_text = dmp.patch_apply(patch, text);
    console.log(new_text);
    editor.getSession().setValue(new_text[0], { silent: true });
  });
});