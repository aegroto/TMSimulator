var tmachine={
    alphabet:[],
    alphabet_extension:undefined,
    blank:"",
    states:[],
    initialState:"",
    finalStates:[],
    delta:"",
    transitions:{}
}

function generateMachine() {
    consolePrint("\n--- Generating machine...");

    try {
        var toDefine=$("#definition").val();
        if(!toDefine.startsWith("<") || !toDefine.endsWith(">")) throw "syntax error in definition";

        toDefine=toDefine.substring(1,toDefine.length-1);
        var toDefine_s=toDefine.split("}");

        var field;
        //Alphabet
        field=toDefine_s[0];
        if(!field.startsWith("{")) throw "syntax error in definition";
        field=field.substring(1,field.length);
        tmachine.alphabet=field.split(",");
        toDefine=toDefine_s[1];

        //Blank
        field=toDefine.split(",")[1];
        if(field.length==0) throw "syntax error in definition";
        tmachine.blank=field;

        //States
        field=toDefine.split("{")[1];
        tmachine.states=field.split(",");
        toDefine=toDefine_s[2];

        //Initial State
        field=toDefine.split(",")[1];
        if(field.length==0) throw "syntax error in definition";
        tmachine.initialState=field;
        
        //Final States
        field=toDefine.split("{")[1];
        tmachine.finalStates=field.split(",");
        toDefine=toDefine_s[3];

        //Delta function
        field=toDefine.split(",")[1];
        if(field.length==0) throw "syntax error in definition";
        tmachine.delta=field;

        //Extended Alphabet
        toDefine=$("#alphabet-extension").val();
        if( toDefine!=undefined && toDefine.length>0) {
            tmachine.alphabet_extension=[];
            if(toDefine.startsWith("{") && toDefine.endsWith("}")) {
                toDefine=toDefine.substr(1,toDefine.length-2);
                tmachine.alphabet_extension=toDefine.split(",");
            }
        }

        //Transitions
        tmachine.transitions=[];
        toDefine=$("#transitions").val().replace(/ |\n/g,"");
        define_s=toDefine.split(">");
        for(var i=0;i<define_s.length;i++) {
            field=define_s[i].substring(1,define_s[i].length);
            if(field.length>0) {
                var def=field.split(',').slice(2).join(','),
                    args=field.substr(0,field.length-def.length-1).split(',');
                if(tmachine.transitions[args[0]]==null || tmachine.transitions[args[0]]==undefined) 
                    tmachine.transitions[args[0]]=[];
                tmachine.transitions[args[0]][args[1]]=def;
            }        
        }

        /////FINISH/////
        consolePrint("--- Successfully generated TM");
    } catch(ex) {
        errorPrint("Unable to generate machine:"+ex);
    }
}

function printCurrentMachineOnConsole() {
    consolePrint("\n--- Current machine:"+
                 "\nAlphabet:"+tmachine.alphabet+
                 "\nAlphabet extension:"+tmachine.alphabet_extension+
                 "\nBlank character:"+tmachine.blank+
                 "\nStates:"+tmachine.states+
                 "\nInitial state:"+tmachine.initialState+
                 "\nFinal states:"+tmachine.finalStates+
                 "\nDelta function:"+tmachine.delta+
                 "\nTransitions:");
    for(key_state in tmachine.transitions) {
        for(key_char in tmachine.transitions[key_state]) {
            consolePrint("      "+key_state+","+key_char+" -> "+tmachine.transitions[key_state][key_char]);
        }
    }
}

function elaborateInputString() {
    consolePrint("\n#####################################\n\n--- Elaborating "+$("#input").val()+"...");
    elaborateString(tmachine.initialState,$("#input").val());
}

var run=false,
    stop=false,
    index,
    state,
    string,
    config,
    tickTime,
    completeAlphabet;

function elaborateString(initialState,str) {
    if(str.length==0) string=tmachine.blank;
    else string=str;
    state=initialState;

    try {
        stop=false;
        if(tmachine.alphabet_extension!=""&&tmachine.alphabet_extension!=undefined) {
            var char;
            for(var i=0;i<string.length;i++) {
                char=string.charAt(i);
                if(!arrayContains(tmachine.alphabet,char) && char!=tmachine.blank) {
                    stop=true;
                    consolePrint(char+" is not a character of the alphabet,input is invalid");
                    break;
                }
            }
        }
        if(!stop) {
            run=true;
            index=0;
            config=string.substr(0,index).concat(state).concat(string.substr(index,string.length));
            tickTime=$("#steptime").val();
            completeAlphabet=tmachine.alphabet.concat(tmachine.alphabet_extension);

            consolePrint("Initial configuration is: "+config);
            elaborateNextChar();
        }
    } catch(ex) {
        errorPrint("Error in input:"+ex);
    }
}

function pauseMachine() {
    if(!stop) {
        run=!run;
        if(run) {
            consolePrint("Machine resumed");
            elaborateNextChar();
        }
        else consolePrint("Machine paused");
    }
}

function stopMachine() {
    if(!stop) {
        consolePrint("Machine stopped!");
        printFinalInformations();
        run=false;
        stop=true;
    }
}

function nextStep() {
    elaborateNextChar();
    if(!run) run=false;
}

var elaborateNextChar=function() {
    var char=string.charAt(index);
    if(char.length==0) {
        run=false 
    } else if(!arrayContains(completeAlphabet,char) && char!=tmachine.blank) {
        run=false;
        stop=false;
        consolePrint("'"+char+"' is not a symbol of the alphabet,stopping machine");          
    } else {
        var def;
        if(tmachine.transitions[state]!=null || tmachine.transitions[state]!=undefined) {
            def=tmachine.transitions[state][char];
        } else {
            def=null;
        }
        if(def==null || def==undefined) {
            run=false;
            stop=true;
            consolePrint(state+","+char+" is not a defined transition,stopping machine");
        } else {
            def_s=def.split(",");
            state=def_s[0];
            string=string.replaceAt(index,def_s[1]);

            switch(def_s[2]) {
                case "r": index++; break;
                case "l": index--; break;
                case "i": break;
                default: run=false;
                         stop=true;
                         consolePrint(def_s[2]+" is not a valid tape move,stopping machine");
            }
            if(index<0) {
                string=tmachine.blank.concat(string);
                index=0;
            } else if(index==string.length) {
                string=string.concat(tmachine.blank);
            }
            config=removeBlanksOnLimits(
                string.substr(0,index).concat(state).concat(string.substr(index,string.length)));

            consolePrint("Configuration is: "+config);
        }
    }
    if(run) setTimeout(elaborateNextChar,tickTime);
    else {
        if(stop) printFinalInformations();
    }
};

function printFinalInformations() {
    var isFinalString=arrayContains(tmachine.finalStates,state)?" [FINAL]":" [NOT FINAL]";
        consolePrint("\n####################\n"+
                     "\nFinal state:"+state+isFinalString+"\nFinal configuration: "+config+
                     "\n\n####################\n");
}

function removeBlanksOnLimits(str) {
    try {
    if(str.startsWith(tmachine.blank)) {
        str=str.substr(1,str.length);
        return removeBlanksOnLimits(str);
    } else if(str.endsWith(tmachine.blank)) {
        str=str.substr(0,str.length-1);
        return removeBlanksOnLimits(str);
    }
    return str;
    } catch(err) {
        consolePrint("[ERROR] Error removing blanks :"+err);
    }
}