var Configuration = require('../index');
var should = require('should');

describe('configuration', function () {

    "use strict";

    describe('defaults', function () {
        var configuration = new Configuration({
            str: "bar",
            bool: true,
            num: 42
        });
        it("should contain default string value", function (done) {
            configuration.get('str').should.equal('bar');
            done();
        });
        it("should contain default boolean value", function (done) {
            configuration.get('bool').should.equal(true);
            done();
        });
        it("should contain default numeric value", function (done) {
            configuration.get('num').should.equal(42);
            done();
        });
        describe('modify defaults', function () {
            it("should be possible to modify a default value without error", function (done) {
                configuration.set('foo', 'new value');
                done();
            });
            it("should contain the new value after modifying it", function (done) {
                configuration.get('foo').should.equal('new value');
                done();
            });
        });
    });

    describe('#set()', function () {
        var configuration = new Configuration();
        it('should add a new setting without error', function (done) {
            configuration.set('key', 'value');
            done();
        });
        it('should return the correct values', function (done) {
            configuration.get('key').should.equal('value');
            done();
        });
        it('should return an instance of configuration', function (done) {
            configuration.set('foo', 'bar').should.be.an.instanceOf(Configuration);
            done();
        });
        it('should return the same instance', function (done) {
            configuration.set('foo', 'bar').should.equal(configuration);
            done();
        });
        it('should emit a "set" event with the right key and value', function (done) {
            configuration.on('set', function (key, value) {
                key.should.equal('eventKey');
                value.should.equal('eventValue');
                done();
            });
            configuration.set('eventKey', 'eventValue');
        });
        it('should emit a "change" event when modifying an existing key', function (done) {
            configuration.on('change', function (key, value) {
                key.should.equal('eventKey');
                value.should.equal('new value');
                done();
            });
            configuration.set('eventKey', 'new value');
        });
    });

    describe('#remove()', function () {
        var configuration = new Configuration();
        configuration.set('key', 'value');
        it('should be possible to remove a key without error', function (done) {
            configuration.remove('key');
            done();
        });
        it('should emit a "remove" event when removing an existing key', function (done) {
            configuration.set('removedKey', 'removedValue');
            configuration.on('remove', function (key, value) {
                key.should.equal('removedKey');
                value.should.equal('removedValue');
                done();
            });
            configuration.remove('removedKey');
        });
        it('should not fail when trying to remove a non existing key', function (done) {
            configuration.remove('does not exist');
            done();
        });
    });

    describe('#has()', function () {
        var configuration = new Configuration({
            foo: "bar"
        });
        it('should be possible to check for values without errors', function (done) {
            configuration.has('foo');
            done();
        });
        it('should return true when key exists', function (done) {
            configuration.has('foo').should.equal(true);
            done();
        });
        it('should return false when key doesn`t exists', function (done) {
            configuration.has('notakey').should.equal(false);
            done();
        });
    });

    describe('#removeAll()', function () {
        var configuration;
        beforeEach(function () {
            configuration = new Configuration();
            configuration.set('foo', 'bar');
        });
        it('should be empty after calling removeAll()', function (done) {
            configuration.removeAll().isEmpty().should.be.true;
            done();
        });
        it('should not return any previously set key', function (done) {
            should.not.exist(configuration.removeAll().get('foo'));
            done();
        });
        it('should return same configuration instance', function (done) {
            configuration.removeAll().should.equal(configuration);
            done();
        });
    });

    describe('#reset()', function () {
        var configuration;
        beforeEach(function () {
            configuration = new Configuration({key: "value"});
            configuration.set('foo', 'bar');
        });
        it('should not be empty after reset', function (done) {
            configuration.reset().isEmpty().should.be.false;
            done();
        });
        it('should not contain set keys', function (done) {
            should.not.exist(configuration.reset().get('foo'));
            done();
        });
        it('should contain default values', function (done) {
            configuration.reset().get('key').should.equal('value');
            done();
        });
    });

});
