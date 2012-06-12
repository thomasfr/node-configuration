var util = require('util');
var EventEmitter = require('events').EventEmitter;
var underscore = require('underscore');

var Configuration = function Configuration(defaults) {
    "use strict";
    EventEmitter.call(this);
    this.defaults = underscore.clone(defaults || {});
    this.data = defaults || {};
};
util.inherits(Configuration, EventEmitter);

Configuration.prototype.set = function set(key, value) {
    "use strict";
    var event;
    var ret = this;
    if (this.data[key]) {
        event = 'change';
    } else {
        event = 'set';
    }
    this.data[key] = value;
    this.emit(event, key, this.data[key]);
    this.emit(event + ':' + key, this.data[key]);
    return ret;
};

Configuration.prototype.get = function get(key) {
    "use strict";
    return this.data[key] || null;
};

Configuration.prototype.remove = function remove(key) {
    "use strict";
    if (this.data[key]) {
        this.emit('remove', key, this.data[key]);
        this.emit('remove:' + key, this.data[key]);
        delete this.data[key];
        this.data[key] = null;
    }
    return this;
};

Configuration.prototype.removeAll = function removeAll() {
    "use strict";
    this.emit('removeAll');
    delete this.data;
    this.data = {};
    return this;
};

Configuration.prototype.isEmpty = function isEmpty() {
    "use strict";
    return underscore.isEmpty(this.data);
};

Configuration.prototype.reset = function reset() {
    "use strict";
    this.emit('reset');
    delete this.data;
    this.data = null;
    this.data = this.defaults;
    return this;
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
        that.set(key, value);
    });
    return this;
};

module.exports = Configuration;
