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

function showShareLink() {
    if(share_space.css("opacity")==undefined || share_space.css("opacity")==0) {
        help_space.detach(); 
        help_space.css({
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

        $("#share-link-textarea").val(encodeURI(("https://aegroto-tms.surge.sh#"+$("#definition").val()+";;;"+$("#transitions").val()).replace(/"/g,"")));
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

function showHelp() {
    if(help_space.css("opacity")==undefined || help_space.css("opacity")==0) {
        share_space.detach(); 
        share_space.css({
            "height":"0",
            "opacity":"0"
        });
        help_space.appendTo(advanced_space);

        setTimeout(function() {
        help_space.css({
            "height":"15em",
            "opacity":"1"
        });
        },10);
    } else {
        help_space.css({
            "height":"0",
            "opacity":"0"
        });

        setTimeout(function() {
            help_space.detach();
        },500);
    }
}

function copyShareLink() {
    document.getElementById("share-link-textarea").select();
    document.execCommand("copy");
}