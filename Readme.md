Configuration
=============

Light-Weight basic module to help you to configure your node.js module


Usage
=====

```
var Configuration = require('Configuration');
var defaultConfig = {
    host: "localhost",
    port: 1234
};
var config = new Configuration(defaultConfig);


config.set("host", "192.168.0.1");

```
