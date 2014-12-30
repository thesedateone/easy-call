var fs = require('fs-extra');

var staticDir = './static/vendor';
var vendorJS = staticDir + '/js';
var vendorCSS = staticDir + '/css';
var vendorFonts = staticDir + '/fonts';

/*
	Ensure target directories do not exist
 */

fs.removeSync(staticDir);
console.log("Deleted directory: " + staticDir);


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
console.log("Copied files from " + jqueryDir);