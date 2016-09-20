var xlsx = require('node-xlsx');
var builder = require('xmlbuilder');
var xml = builder.create('root')
    .ele('xmlbuilder')
    .ele('repo', {'type': 'git'}, 'git://github.com/oozcitak/xmlbuilder-js.git')
    .end({ pretty: true});

console.log(xml);


// Parse a file
var workSheetsFromFile = xlsx.parse('source/file1.xlsx');
var sheet1 = workSheetsFromFile[0];

//console.log(sheet1);

