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

//Hash analysis
var hash_s=location.hash.substring(1,location.hash.length).replace(/"/g,"").split(SPLIT_SEQ);

/*********************/
/***INITIAL IMPORTS***/
/*********************/

//Text only output (API)
if(hash_s.length>1 && hash_s[0]!=null && hash_s[0]!=undefined) {
    if(decodeURI(hash_s[0]) != "") OPTIONS_DIRECT_INPUT=hash_s[0];
    else OPTIONS_DIRECT_INPUT=undefined;
}

/*************/
/***IMPORTS***/
/*************/

//Turing Machine definition
if(hash_s.length>1 && hash_s[1]!=null && hash_s[1]!=undefined) {
    OPTIONS_DEFINITION=decodeURI(hash_s[1]);
}

//Transitions
if(hash_s.length>1 && hash_s[2]!=null && hash_s[2]!=undefined) {
    OPTIONS_TRANSITIONS=decodeURI(hash_s[2]);
}

//Steptime
if(hash_s.length>1 && hash_s[3]!=null && hash_s[3]!=undefined) {
    OPTIONS_STEPTIME=decodeURI(hash_s[3]);
}

//Alphabet extension
if(hash_s.length>1 && hash_s[4]!=null && hash_s[4]!=undefined) {
    OPTIONS_ALPHABET_EXTENSION=decodeURI(hash_s[4]);
}

if(OPTIONS_DIRECT_INPUT == undefined) {
    consolePrint("ERROR:Input is null or undefined");
} else {
    generateMachine(
        OPTIONS_DEFINITION,
        OPTIONS_TRANSITIONS,
        0,
        OPTIONS_ALPHABET_EXTENSION
    );

    elaborateStringOnInitialState(OPTIONS_DIRECT_INPUT);

    $("head").detach();
    $("body").detach();
}