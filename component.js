// Generated by CoffeeScript 1.7.1
(function() {
  var Component, React, extractMethods, extractStatics, ignoredKeys, tagParser, translateTagCalls, umd,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Component = (function() {
    function Component() {}

    Component.reactify = function() {
      return React.createClass(extractMethods(this));
    };

    return Component;

  })();

  extractMethods = function(comp) {
    var key, methods, val, _ref;
    methods = {};
    _ref = comp.prototype;
    for (key in _ref) {
      val = _ref[key];
      if (__indexOf.call(ignoredKeys, key) >= 0) {
        continue;
      }
      methods[key] = translateTagCalls(val);
    }
    methods.displayName = comp.name || comp.displayName || 'UnnamedComponent';
    methods.statics = extractStatics(comp);
    return methods;
  };

  extractStatics = function(comp) {
    var key, statics, val;
    statics = {
      Class: comp
    };
    for (key in comp) {
      val = comp[key];
      if (__indexOf.call(ignoredKeys, key) >= 0) {
        continue;
      }
      statics[key] = translateTagCalls(val);
    }
    return statics;
  };

  ignoredKeys = '__super__ constructor reactify'.split(' ');

  tagParser = /this\.(\w*)\(/g;

  translateTagCalls = function(fn) {
    var compiled, source;
    if (typeof fn !== 'function') {
      return fn;
    }
    source = fn.toString();
    compiled = source.replace(tagParser, function(segment) {
      var tag;
      tag = segment.replace('this.', '').replace('(', '');
      if (React.DOM[tag] != null) {
        return "React.DOM." + tag + "(";
      } else {
        return segment;
      }
    });
    if (compiled !== source) {
      return eval("(" + compiled + ")");
    } else {
      return fn;
    }
  };

  React = this.React || require('react');

  umd = function(factory) {
    if (typeof exports === 'object') {
      return module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
      return define([], factory);
    } else {
      return this.Component = factory();
    }
  };

  umd(function() {
    return Component;
  });

  React.Component = Component;

}).call(this);
