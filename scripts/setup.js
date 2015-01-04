var fs = require('fs-extra');

var appDir = './static/app';
var appJS = appDir + '/js';
var appCSS = appDir + '/css';

/*
	Create empty directories expected by build
 */

fs.ensureDirSync(appJS);
console.log("Created directory " + appJS);
fs.ensureDirSync(appCSS);
console.log("Created directory " + appCSS);