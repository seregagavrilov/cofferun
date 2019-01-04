(function (window) {
  'use strict'
  var App = window.App || {};

  function Truck(truckid, db) {
    this.truckid = truckid;
    this.db = db;
    this.dbRemote = db.remote;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress)
    return this.db.add(order.emailAddress, order)
  };

  Truck.prototype.deliverOrder = function (customerid) {
    console.log('Delivering order for ' + customerid);
    return this.db.remove(customerid)
  };

  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll()
      .then(function (orders) {
        var costomerIDArray = Object.keys(orders);
        console.log('Truck #' + this.truckid + ' has pending orders: ');
        costomerIDArray.forEach(function (id) {
          console.log(orders[id]);
          if (printFn){
            printFn(orders[id]);
          }
        }.bind(this));
      }.bind(this));
  };

  Truck.prototype.getOrder = function (email, fn) {
    return this.db.get(email, fn)
  };
  App.Truck = Truck;
  window.App = App;
})(window)
