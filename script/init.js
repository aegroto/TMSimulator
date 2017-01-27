var //Default options vars
    DEFAULT_OPTIONS_DEFINITION="<{a,b},#,{q0,qF},q0,{qF},d>",
    DEFAULT_OPTIONS_TRANSITIONS="<q0,a,q0,a,r>\n<q0,b,qF,#,r>",

    DEFAULT_OPTIONS_STEPTIME="50",
    DEFAULT_OPTIONS_ALPHABET_EXTENSION="",  

    //Options vars
    OPTIONS_DIRECT_INPUT=undefined,

    OPTIONS_DEFINITION=DEFAULT_OPTIONS_DEFINITION,
    OPTIONS_TRANSITIONS=DEFAULT_OPTIONS_TRANSITIONS,

    OPTIONS_STEPTIME=DEFAULT_OPTIONS_STEPTIME,
    OPTIONS_ALPHABET_EXTENSION=DEFAULT_OPTIONS_ALPHABET_EXTENSION,

    //Various
    SPLIT_SEQ=";;;";

clearConsole();

var body=$("body"),
    //Share space
    share_space=$("#share-space"),
    options_space=$("#options-space"),
    advanced_space=$("#advanced-space"),

    //Docs space
    docs_space=$("#docs-space"),
    help_page=$("#help-page"),
    examples_page=$("#examples-page");

help_page.css("position","absolute");
examples_page.css("position","absolute");

docs_space.click(function() {
    switchDocsSpace();
});

showOptions();

if(isConsoleEmpty()) consolePrint("Welcome!\nDefine your machine,click \"Generate TM\" and then \"Execute\" to let the TM elaborate the input string!");
consolePrint("\n#####################################\n");

$("#input").val("aaabbb");

updateMachine(location.hash);