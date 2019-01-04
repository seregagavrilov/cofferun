(function (window) {
  'use strict';
  var App = window.App || {};
  var data = {};
  var Promise = window.Promise;

  function DataStore() {
    this.remote = false;
  }

  function promiseResolvedWith(value) {
    var promise = new Promise(function (resolve, reject) {
        resolve(value);      
    }.bind(this));
    return promise;
  }

  DataStore.prototype.add = function (key, val) {
    data[key] = val;
    return promiseResolvedWith(val);
  }

  DataStore.prototype.get = function (key) {
    return promiseResolvedWith(data[key]);
  }

  DataStore.prototype.getAll = function () {
    return promiseResolvedWith(data);
  }

  DataStore.prototype.remove = function (key) {
    delete data[key];
    return promiseResolvedWith(null);
  }

  App.DataStore = DataStore;
  window.App = App;
})(window);
