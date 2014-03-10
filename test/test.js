var test = require('tape');
var parcelify = require('../');
var os = require('os');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var tmpdir = (os.tmpdir || os.tmpDir)();

 test( 'page1', function( t ) {
	t.plan( 2 );
	
	var mainPath = __dirname + '/page1/main.js';
	
	var dstDir = path.resolve( tmpdir, 'parcelify-test-' + Math.random() );

	dstDir = 'test-output';

	var options = {
		bundles : {
			script : path.join( dstDir, 'bundle.js' ),
			style : path.join( dstDir, 'bundle.css' ),
		}
	};

	mkdirp.sync( dstDir );

	parcelify( mainPath, options, function( err, parcel ) {
		if( err ) throw err;

		parcel.on( 'done', function() {
			t.deepEqual(
				fs.readdirSync( dstDir ).sort(),
				[ 'bundle.css', 'bundle.js' ]
			);

			t.deepEqual( fs.readFileSync( options.bundles.style, 'utf8' ), 'h1 {\n\tfont-size: 18px;\n}body {\n	color: red;\n}' );
		} );
	} );
} );

test( 'page2', function( t ) {
	t.plan( 2 );
	
	var mainPath = __dirname + '/page2/index.js';
	
	var dstDir = path.resolve( tmpdir, 'parcelify-test-' + Math.random() );
	var options = {
		bundles : {
			script : path.join( dstDir, 'bundle.js' ),
			style : path.join( dstDir, 'bundle.css' )
		}
	};

	mkdirp.sync( dstDir );

	parcelify( mainPath, options, function( err, parcel ) {
		if( err ) throw err;

		parcel.on( 'done', function() {
			t.deepEqual(
				fs.readdirSync( dstDir ).sort(),
				[ 'bundle.css', 'bundle.js' ]
			);

			t.deepEqual( fs.readFileSync( options.bundles.style, 'utf8' ), 'h1 {\n\tfont-size: 18px;\n}h2 {\n\tfont-weight: bold;\n}' );
		} );
	} );
} );

test( 'page4', function( t ) {
	t.plan( 2 );
	
	var mainPath = __dirname + '/page4/main.js';
	
	var dstDir = path.resolve( tmpdir, 'parcelify-test-' + Math.random() );
	var options = {
		bundles : {
			script : path.join( dstDir, 'bundle.js' ),
			style : path.join( dstDir, 'bundle.css' )
		}
	};

	mkdirp.sync( dstDir );

	parcelify( mainPath, options, function( err, parcel ) {
		if( err ) throw err;

		parcel.on( 'done', function() {
			t.deepEqual(
				fs.readdirSync( dstDir ).sort(),
				[ 'bundle.css', 'bundle.js' ]
			);

			t.deepEqual( fs.readFileSync( options.bundles.style, 'utf8' ), 'h1 {\n\tfont-size: 18px;\n}body h3 {\n  color: red; }\n' );
		} );
	} );
} );