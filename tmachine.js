var tmachine={
    alphabet:[],
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

        //Alphabet
        var field=toDefine_s[0];
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

        //Transitions
        tmachine.transitions=[];
        toDefine=$("#transitions").val().replace(/ |\n/g,"");
        define_s=toDefine.split(">");
        for(var i=0;i<define_s.length;i++) {
            field=define_s[i].substring(1,define_s[i].length);
            if(field.length>0) {
                var def=field.split(',').slice(2).join(','),
                    args=field.substr(0,field.length-def.length-1).split(',');
                if(tmachine.transitions[args[0]]==null || tmachine.transitions[args[0]]==undefined) tmachine.transitions[args[0]]={};
                tmachine.transitions[args[0]][args[1]]=def;
                
                //consolePrint(args[0]+" "+args[1]+" "+def+" "+tmachine.transitions[args[0]][args[1]]);
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
    consolePrint("\n--- Elaborating "+$("#input").val()+"...");
    elaborateString(tmachine.initialState,$("#input").val());
}

var runMachine=false;
function elaborateString(state,string) {
    try {
        var i=0,config="",tickTime=100;
        runMachine=true;
        var elaborateNextChar=function() {
            var char=string.charAt(i);
            if(char.length==0) {
                runMachine=false 
            } //else if(!arrayContains(tmachine.alphabet,char)) throw "'"+char+"' is not a symbol of the alphabet";          
            else {
                var def=tmachine.transitions[state][char];
                if(def==null || def==undefined) {
                    runMachine=false;
                    consolePrint(state+","+char+" is not a defined transition,stopping machine");
                } else {
                    def_s=def.split(",");
                    state=def_s[0];
                    string=string.replaceAt(i,def_s[1]);

                    switch(def_s[2]) {
                        case "d": i++; break;
                        case "s": i--; break;
                        case "i": break;
                        default: runMachine=false;
                                 consolePrint(def_s[2]+" is not a valid tape move,stopping machine");
                    }
                    config=string.substr(0,i).concat(state).concat(string.substr(i,string.length-1));

                    consolePrint("Configuration is: "+config);
                }
            }
             if(runMachine) setTimeout(elaborateNextChar,tickTime);
             else {
                var isFinalString=arrayContains(tmachine.finalStates,state)?" [FINAL]":" [NOT FINAL]";
                consolePrint("Final state:"+state+isFinalString+"\nFinal configuration: "+config);
             }
        };
        elaborateNextChar();
    } catch(ex) {
        errorPrint("Invalid input:"+ex);
    }
}

function stopMachine() {
    if(runMachine) {
        consolePrint("Machine stopped!");
        runMachine=false;
    }
}