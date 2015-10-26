var fs = require('fs-extra');

var vendorDir = './assets/vendor';
var vendorJS = vendorDir + '/js';
var vendorCSS = vendorDir + '/css';
var vendorFonts = vendorDir + '/fonts';

var appDir = './assets/app';
var appImages = appDir + '/images';
var appPartials = appDir + '/partials';
var appJS = appDir + '/js';

/*
	Collect bootstrap & font awesome dist files
 */

var bootstrapDir = './bower_components/bootstrap/dist';
var fontAwesomeDir = './bower_components/font-awesome/';

// var bootstrapCSS = bootstrapDir + '/css';
// fs.copySync(bootstrapCSS + '/bootstrap.min.css', vendorCSS + '/bootstrap.min.css');
// console.log("Copied files from " + bootstrapCSS);

// var fontAwesomeCSS = fontAwesomeDir + '/css';
// fs.copySync(fontAwesomeCSS + '/font-awesome.min.css', vendorCSS + '/font-awesome.min.css');
// console.log("Copied files from " + fontAwesomeCSS);

// var bootstrapFonts = bootstrapDir + '/fonts';
// fs.copySync(bootstrapFonts, vendorFonts);
// console.log("Copied files from " + bootstrapFonts);

// var fontAwesomeFonts = fontAwesomeDir + '/fonts';
// fs.copySync(fontAwesomeFonts, vendorFonts);
// console.log("Copied files from " + fontAwesomeFonts);

// var bootstrapJS = bootstrapDir + '/js';
// fs.copySync(bootstrapJS + '/bootstrap.min.js', vendorJS + '/bootstrap.min.js');
// console.log("Copied files from " + bootstrapJS);


/*
	Collect jquery dist files
 */

// var jqueryDir = './bower_components/jquery/dist';

// fs.copySync(jqueryDir + '/jquery.min.js', vendorJS + '/jquery.min.js');
// fs.copySync(jqueryDir + '/jquery.min.map', vendorJS + '/jquery.min.map');
// console.log("Copied files from " + jqueryDir);


/*
	Collect angular dist files
 */


// var angularDir = './bower_components/angular';
// fs.copySync(angularDir + '/angular.min.js', vendorJS + '/angular.min.js');
// fs.copySync(angularDir + '/angular.min.js.map', vendorJS + '/angular.min.js.map');
// console.log("Copied files from " + angularDir + " to " +  vendorJS);

// var angularRouteDir = './bower_components/angular-route';
// fs.copySync(angularRouteDir + '/angular-route.min.js', vendorJS + '/angular-route.min.js');
// fs.copySync(angularRouteDir + '/angular-route.min.js.map', vendorJS + '/angular-route.min.js.map');
// console.log("Copied files from " + angularRouteDir + " to " +  vendorJS);

// var restangularDir = './bower_components/restangular/dist';
// fs.copySync(restangularDir + '/restangular.min.js', vendorJS + '/restangular.min.js');
// console.log("Copied files from " + restangularDir + " to " +  vendorJS);

// var lodashDir = './bower_components/lodash';
// fs.copySync(lodashDir + '/lodash.min.js', vendorJS + '/lodash.min.js');
// console.log("Copied files from " + lodashDir + " to " +  vendorJS);

/*
	Collect app image files
 */

// var assetDir = './web';
// fs.copySync(assetDir + '/images/', appImages);
// console.log("Copied files from " + assetDir + '/images/');


/*
	Collect app partials
 */

var assetDir = './web';
fs.copySync(assetDir + '/partials/', appPartials);
console.log("Copied files from " + assetDir + '/partials/');


/*
	TEMPORARY:  Collect app js files
 */

// fs.copySync(assetDir + '/js/', appJS);
// console.log("Copied files from " + assetDir + '/js/');