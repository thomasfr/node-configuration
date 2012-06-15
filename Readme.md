Configuration
=============

Light-Weight module for node.js to help you to configure your node.js module(s) or
administer your settings.

Installation
============

```
npm install configuration
```


Usage
=====

```
var Configuration = require('Configuration');

var defaultConfig = {
    host: "localhost",
    port: 1234
};
var config = new Configuration(defaultConfig);

config.on('change', function(key, value) {
    console.log("value of '" + key + "' has changed to '" + value + "'");
});

// This also works for 'add' and 'remove' events.
config.on('change:host', function(newValue) {
    console.log("config key 'host' was changed to '" + newValue + "');
});

config.on('set', function(key, value) {
    console.log("new config '" + key + "' added. Value: '" + value + "'");
});

config.on('remove', function(key) {
    console.log("config with '" + key + "' gets removed");
});


config.set("host", "192.168.0.1");
config.set("featureFoo", true);

console.log("has featureFoo? ", config.has("featureFoo");

// Resets its internal values to the default values given at creation @see: defaultConfig
config.reset();

// will output 'localhost' and not '192.168.0.1'
console.log(config.get("host"));

// Removes all config values. Even default values.
config.removeAll();

// Will output true after removeAll() otherwise false ;)
console.log(config.isEmpty());


```

LICENSE
=======

Copyright (c) 2012 Thomas Fritz

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
