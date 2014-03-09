
# Parcelify

Parcelify is a wrapper around browserify that allows you to create bundles of css from style assets in npm modules.

## How dat work?

```
├── node_modules
│   └── my-module
│       ├── index.js
│       ├── myModule.css
│       ├── myModule.scss
│       └── package.json
└── main.js
```

In my-module's package.json, the module's style assets are enumerated using glob notation:

```
{
	"style" : [ "*.css" ]
}
```

Meanwhile, in `main.js`,

```javascript
myModule = require( 'my-module' );

console.log( 'hello world' );
```

To run parcelify from the command line,

```
$ parcelify main.js -j bundle.js -c bundle.css
```

Now bundle.css contains all the styles that correspond to the main.js entry point, and bundle.js is browserify's output.

## Command line usage

```
parcelify mainFile.js [options]
```

Standard Options:

    --jsBundle, -j    Path of the javascript bundle. If unspecified, no javscript bundle is output.
                    
    --cssBundle, -c   Path of the style bundle. If unspecified, no css bundle is output.

    --tmplBundle, -t  Path of the template bundle. If unspecified, no template bundle is output. Template
                      assets are specified in the exact same way as style assets, just using a
                      template key in package.json instead of a `style` key.
   
    --watch, -w       Watch mode - automatically rebuild bundles as appropriate for changes.
    
    --debug, -d       Enable source maps that allow you to debug your js files separately.
                      (Passed through directly to browserify.)

    --help, -h        Show this message

## package.json

Several keys are introcued in package.json files.

The `style` key is a glob or array of globs that describe the style assets of the module.

The `template` key is the same as the `style` key, just for templates instead of styles.

The `tranforms` key is an array of names or file paths of [transform modules](https://github.com/substack/module-deps#transforms) to be applied to assets.

## Contributors

* [James Halliday](https://twitter.com/substack)
* [David Beck](https://twitter.com/davegbeck)
* [Oleg Seletsky](https://github.com/go-oleg)

## License

MIT