var xlsx = require('node-xlsx');
var builder = require('xmlbuilder');
var async = require('async');
var fs = require('fs');

// Parse a file
var workSheetsFromFile = xlsx.parse('source/file1.xlsx');
var sheet1 = workSheetsFromFile[0];
var exData = sheet1.data;
var titleName = exData[0][2];
var fileTask = [];
var exReadResult = [];

// ex to json object -> exReadResult
for (var i = 1; i < exData.length; i++) {
    var tmpTitle;
    if(exData[i].length === 3){
        tmpTitle = exData[i][1].split('+');
        tmpTitle = tmpTitle[1];
        exReadResult.push({
            fileName:exData[i][1],
            data: exData[i][2],
            title: titleName + ' ' + tmpTitle
        });
    }
}

// Create xml data
exReadResult.forEach(function(exData){
    var xmlData = builder.create('root');
    xmlData.ele('title',exData.title);
    xmlData.ele('data', exData.data);
    xmlData = xmlData.end({pretty: true});
    exData.xmlData = xmlData;
});

// Creating series file callback queue

exReadResult.forEach(function(exData){
    fileTask.push(function(callback){
        var filePath = 'output/'+exData.fileName+'.xml';
        fs.writeFile(filePath, exData.xmlData, function(err){
            if(err){
                callback(err, null);
            }else{
                callback(null, 'Success: '+filePath);
            }
        });
    });
});

async.series(fileTask,function(err,result){
    if(err){
        console.log('Some error occure ', err);
    }else{
        console.log('Successfully completed ', result);
    }
});