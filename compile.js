const pug = require('pug');
const fs = require('fs');

const output=pug.compileFile('raw/index.pug');
fs.writeFile("./index.html", output(), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Exported html");
}); 