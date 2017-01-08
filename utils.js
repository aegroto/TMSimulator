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

function generateShareLink() {
    return ("https://aegroto-tms.surge.sh#"+SPLIT_SEQ+
        $("#definition").val()+SPLIT_SEQ+
        $("#transitions").val()+SPLIT_SEQ+
        OPTIONS_STEPTIME+SPLIT_SEQ+
        OPTIONS_ALPHABET_EXTENSION).replace(/"/g,"");
}

function showShareLink() {
    if(share_space.css("opacity")==undefined || share_space.css("opacity")==0) {
        updateOptionsConstants();

        options_space.detach(); 
        options_space.css({
            "height":"0",
            "opacity":"0"
        });

        share_space.appendTo(advanced_space);

        setTimeout(function() {
        share_space.css({
            "height":"15em",
            "opacity":"1"
        });
        },10);

        $("#share-link-textarea").val(encodeURI(generateShareLink()));
    } else {
        share_space.css({
            "height":"0",
            "opacity":"0"
        });

        setTimeout(function() {
            share_space.detach();
        },500);
    }
}

function showOptions() {
    if(options_space.css("opacity")==undefined || options_space.css("opacity")==0) {
        share_space.detach(); 
        share_space.css({
            "height":"0",
            "opacity":"0"
        });
        options_space.appendTo(advanced_space);

        setTimeout(function() {
        options_space.css({
            "height":"15em",
            "opacity":"1"
        });
        },10);
    } else {
        options_space.css({
            "height":"0",
            "opacity":"0"
        });

        setTimeout(function() {
            options_space.detach();
        },500);

        updateOptionsConstants();
    }
}

function updateOptionsConstants() {
    OPTIONS_STEPTIME=$("#steptime").val()==undefined ? OPTIONS_STEPTIME : $("#steptime").val();
    OPTIONS_ALPHABET_EXTENSION=$("#alphabet-extension").val()==undefined ? OPTIONS_ALPHABET_EXTENSION : $("#alphabet-extension").val();
}

function copyShareLink() {
    document.getElementById("share-link-textarea").select();
    document.execCommand("copy");
}

function parseSpecialsToHTML(text) { //ONLY TESTING PURPOSE,SHOULD NOT BE USED IN PRODUCTION
    return text.replace(/\n/g,"</br>");
}