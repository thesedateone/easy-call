var fs = require('fs-extra');

var vendorDir = './static/vendor';
var vendorJS = vendorDir + '/js';
var vendorCSS = vendorDir + '/css';
var vendorFonts = vendorDir + '/fonts';

var appDir = './static/app';
var appImages = appDir + '/images';
var appPartials = appDir + '/partials';
var appJS = appDir + '/js';

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


/*
	Collect angular dist files
 */


var angularDir = './node_modules/angular';
fs.copySync(angularDir + '/angular.min.js', vendorJS + '/angular.min.js');
fs.copySync(angularDir + '/angular.min.js.map', vendorJS + '/angular.min.js.map');
console.log("Copied files from " + angularDir + " to " +  vendorJS);

var angularRouteDir = './node_modules/angular-route';
fs.copySync(angularRouteDir + '/angular-route.min.js', vendorJS + '/angular-route.min.js');
fs.copySync(angularRouteDir + '/angular-route.min.js.map', vendorJS + '/angular-route.min.js.map');
console.log("Copied files from " + angularRouteDir + " to " +  vendorJS);


/*
	Collect app image files
 */

var assetDir = './assets';
fs.copySync(assetDir + '/images/', appImages);
console.log("Copied files from " + assetDir + '/images/');


/*
	Collect app partials
 */

var assetDir = './assets';
fs.copySync(assetDir + '/partials/', appPartials);
console.log("Copied files from " + assetDir + '/partials/');


/*
	TEMPORARY:  Collect app js files
 */

fs.copySync(assetDir + '/js/', appJS);
console.log("Copied files from " + assetDir + '/js/');