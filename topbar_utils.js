/******************/
/*******HELP*******/
/******************/
function showHelpPage() {
    help_page.removeClass("hidden-docs-page");
    help_page.addClass("active-docs-page");
}

function hideHelpPage() {
    help_page.removeClass("active-docs-page");
    help_page.addClass("hidden-docs-page");
}

function switchHelpPage() {
    switchDocsSpace();

    if(help_page.css("opacity")==undefined || help_page.css("opacity")==0) {
        showHelpPage();
    } else {
        hideHelpPage();
    }
}

/******************/
/*****EXAMPLES*****/
/******************/
function showExamplesPage() {
    examples_page.removeClass("hidden-docs-page");
    examples_page.addClass("active-docs-page");
}

function hideExamplesPage() {
    examples_page.removeClass("active-docs-page");
    examples_page.addClass("hidden-docs-page");
}

function switchExamplesPage() {
    switchDocsSpace();
    if(examples_page.css("opacity")==undefined || examples_page.css("opacity")==0) {
        showExamplesPage();
    } else {
        hideExamplesPage();
    }
}

function switchDocsSpace() {
    if(docs_space.css("opacity")==undefined || docs_space.css("opacity")==0) {
        setTimeout(function() {
            docs_space.css({
                "opacity":"1",
                "height":"100%",
            });
        },10);

        docs_space.css("z-index","1");
    } else {
        hideHelpPage();
        hideExamplesPage();

        docs_space.css({
            "opacity":"0",
            "height":"0",
            "z-index":"-1"
        });
    }
}