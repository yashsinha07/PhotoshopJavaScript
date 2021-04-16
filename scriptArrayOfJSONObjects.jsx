#include json2.js

(function main(){
    var inputs = loadJSON('inputs.json');

    for(var i=0; i< inputs.length; i++){
        var input = inputs[i];
        processInput(input);
    }
});

function processInput(input){

    var doc = app.activeDocument;

    //Changing App Name in a Text Layer
    var layer9 = doc.layerSets.getByName('Layer 9');
    var appNameText = layer9.layers[1];
    appNameText.textItem.contents = input.appName;

    var fileName = input.appName;

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

    layer9.visible = false;
    layer3.visible = false;
    layer4.visible = false;

    saveGroup(layer9, input.appName + '-layer9');
    saveGroup(layer3, input.appName + '-layer3');
    saveGroup(layer4, input.appName + '-layer4');

    //Saving the template in JPEG Format
    // var fileName = input.appName;
    // saveJpeg(fileName);

}

function saveGroup(group, name){
    group.visible = true;
    saveJpeg(name);
    group.visible = false;
}

function loadJSON(relPath){
    var script = new File($.fileName);
    var jsonFile = new File(script.path + '/' + relPath);

    jsonFile.open('r');
    var str = jsonFile.read();
    jsonFile.close();

    return JSON.parse(str);
}

function saveJpeg(name){

    var doc = app.activeDocument;       //Selects the active document on Photoshop
    var file = new File(doc.path + '/' + name + '.jpg');

    var opts = new JPEGSaveOptions();
    opts.quality = 10;                  //High quality JPEG save

    doc.saveAs(file, opts, true);
}