String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function arrayContains(array,obj) {
    for(i in array) {
        //consolePrint(array[i]);
        if(array[i]==obj) return true;
    }
    return false;
};

function updateOptionsConstants() {
    OPTIONS_STEPTIME=$("#steptime").val()==undefined ? OPTIONS_STEPTIME : $("#steptime").val();
    OPTIONS_ALPHABET_EXTENSION=$("#alphabet-extension").val()==undefined ? OPTIONS_ALPHABET_EXTENSION : $("#alphabet-extension").val();
}

function parseSpecialsToHTML(text) { //ONLY TESTING PURPOSE,SHOULD NOT BE USED IN PRODUCTION
    return text.replace(/\n/g,"</br>");
}