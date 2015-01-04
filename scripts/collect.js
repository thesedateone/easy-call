var fs = require('fs-extra');

var vendorDir = './static/vendor';
var vendorJS = vendorDir + '/js';
var vendorCSS = vendorDir + '/css';
var vendorFonts = vendorDir + '/fonts';


/*
	Collect bootstrap dist files
 */

var bootstrapDir = './node_modules/bootstrap/dist';

var bootstrapCSS = bootstrapDir + '/css';
fs.copySync(bootstrapCSS + '/bootstrap.min.css', vendorCSS + '/bootstrap.min.css');
console.log("Copied files from " + bootstrapCSS);

var bootstrapFonts = bootstrapDir + '/fonts';
fs.copySync(bootstrapFonts, vendorFonts);
console.log("Copied files from " + bootstrapFonts);

var bootstrapJS = bootstrapDir + '/js';
fs.copySync(bootstrapJS + '/bootstrap.min.js', vendorJS + '/bootstrap.min.js');
console.log("Copied files from " + bootstrapJS);


/*
	Collect jquery dist files
 */

var jqueryDir = './node_modules/jquery/dist';

fs.copySync(jqueryDir + '/jquery.min.js', vendorJS + '/jquery.min.js');
fs.copySync(jqueryDir + '/jquery.min.map', vendorJS + '/jquery.min.map');
console.log("Copied files from " + jqueryDir);