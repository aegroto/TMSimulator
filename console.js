function consolePrint(text) {
    //$(":root").append(parseSpecialsToHTML(text+"\n")); //TESTING ONLY
    $(":root").append(text+SPLIT_SEQ);
}

function errorPrint(text) {
    consolePrint("[ERROR] "+text);
}

function clearConsole() {
    //console_textarea.val("");
}

function isConsoleEmpty() {
    /*if(OPTIONS_DIRECT_INPUT == undefined)
        return console_textarea.val()=="";*/
    return false;
}