$(window).on('load',function(){
  
  var last_applied_change = null;
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");
  
  var dmp = new diff_match_patch();

  var socket = io.connect();

  editor.on('change', function (data) {
    // var NewText = editor.getSession().getValue();
    // var diff = dmp.diff_main(OldText,NewText);
    // //dmp.diff_cleanupSemantic(diff);
    // OldText = NewText;
    if (last_applied_change != data)
      socket.emit('diff', JSON.stringify(data));
        console.log(data);
    });
   
  socket.on('patch', (diff) => {
    // var text = editor.getSession().getValue();
    // var patch = dmp.patch_make(text, diff);
    // var new_text = dmp.patch_apply(patch, text);
    // console.log(new_text);
    //editor.getSession().setValue(new_text[0], { silent: true });
    diff = JSON.parse( diff ) ;
    last_applied_change = diff;
    editor.getSession().getDocument().applyDeltas( [diff] );
  });
});