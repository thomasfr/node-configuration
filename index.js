var util = require('util');
var EventEmitter = require('events').EventEmitter;
var underscore = require('underscore');

var Configuration = function Configuration(defaults) {
    "use strict";
    EventEmitter.call(this);
    this.data = defaults || {};
};
util.inherits(Configuration, EventEmitter);

Configuration.prototype.set = function set(key, value) {
    "use strict";
    if (this.data[key]) {
        this.data[key] = value;
        this.emit('change', key, this.data[key]);
    } else {
        this.data[key] = value;
        this.emit('set', key, this.data[key]);
    }
};

Configuration.prototype.get = function get(key) {
    "use strict";
    return this.data[key] || null;
};

Configuration.prototype.remove = function remove(key) {
    "use strict";
    if (this.data[key]) {
        this.emit('remove', key, this.data[key]);
        delete this.data[key];
        this.data[key] = null;
    }
};

Configuration.prototype.has = function has(key) {
    "use strict";
    return this.data[key] ? true : false;
};

Configuration.prototype.setAll = function setAll(config) {
    "use strict";
    var that = this;
    this.emit('setAll', config);
    underscore.each(config, function (value, key) {
        that.add(key, value);
    });
};

module.exports = Configuration;
