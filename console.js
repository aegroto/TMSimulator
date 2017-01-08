function consolePrint(text) {
    if(OPTIONS_DIRECT_INPUT == undefined) {
        console_textarea.val(console_textarea.val()+text+"\n");
        console_textarea.scrollTop(console_textarea[0].scrollHeight - console_textarea.height());
    } else {
        //$(":root").append(parseSpecialsToHTML(text+"\n")); //TESTING ONLY
        $(":root").append(text+"\n");
    }
}

function errorPrint(text) {
    consolePrint("[ERROR] "+text);
}

function clearConsole() {
    console_textarea.val("");
}

function isConsoleEmpty() {
    if(OPTIONS_DIRECT_INPUT == undefined)
        return console_textarea.val()=="";
    return true;
}