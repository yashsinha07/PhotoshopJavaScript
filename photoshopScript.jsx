#include json2.js

var input = loadJSON('test.json');
var doc = app.activeDocument;

//Changing App Name in a Text Layer
var layer9 = doc.layerSets.getByName('Layer 9');
var appNameText = layer9.layers[1];
appNameText.textItem.contents = input.appName;

//Changing Developer Name in a Text Layer
var developerNameText = layer9.layers[0];
developerNameText.textItem.contents = input.developerName;

//Changing Store Name in a Text Layer
var layer3 = doc.layerSets.getByName('Layer 3');
var storeNameText = layer3.layers[0];
storeNameText.textItem.contents = input.storeName;

//Changing CTA Text in a Text Layer
var layer4 = doc.layerSets.getByName('Layer 4');
var ctaText = layer4.layers[0];
ctaText.textItem.contents = input.ctaText;


//Saving the template in JPEG Format
saveJpeg(input.appName);

//Load JSON
function loadJSON(relPath){
    var script = new File($.fileName);
    var jsonFile = new File(script.path + '/' + relPath);

    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();

    return JSON.parse(str);
}


//Save JPEG
function saveJpeg(name){

    var file = new File(app.activeDocument.path + '/' + name + '.jpg');

    var opts = new JPEGSaveOptions();
    opts.quality = 10;                  //High quality JPEG save

    doc.saveAs(file, opts, true);
}