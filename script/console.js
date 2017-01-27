function consolePrint(text) {
    $("#console").val($("#console").val()+text+"\n");

    var console_ta = $('#console');
    console_ta.scrollTop(console_ta[0].scrollHeight - console_ta.height());
}

function errorPrint(text) {
    consolePrint("[ERROR] "+text);
}

function clearConsole() {
    $("#console").val("");
}

function isConsoleEmpty() {
    return $("#console").val()=="";
}