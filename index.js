var util = require('util');
var events = require('events');
var underscore = require('underscore');

var Configuration = function Configuration(defaults) {
    "use strict";
    events.EventEmitter.call(this);
    this.data = defaults || {};
};

util.inherits(Configuration, events.EventEmitter);

Configuration.prototype.add = function set(key, value) {
    "use strict";
    if (this.data[key]) {
        this.data[key] = value;
        this.emit('change', this.data[key]);
    } else {
        this.data[key] = value;
        this.emit('set', this.data[key]);
    }
};

Configuration.prototype.get = function get(key) {
    "use strict";
    return this.data[key] || null;
};

Configuration.prototype.remove = function remove(key) {
    "use strict";
    if (this.data[key]) {
        this.emit('remove', this.data[key]);
        delete this.data[key];
        this.data[key] = null;
    }
};

Configuration.prototype.has = function has(key) {
    "use strict";
    return this.data[key] ? true : false;
};

Configuration.prototype.set = function setAll(config) {
    "use strict";
    var that = this;
    underscore.each(config, function (value, key) {
        that.add(key, value);
    });
};

module.exports = Configuration;
