(function(window) {
  'use strict'
  var App = window.App || {};

  function Truck(truckid, db) {
    this.truckid = truckid;
    this.db = db;
  }

Truck.prototype.createOrder = function (order) {
  console.log('Adding order for '+ order.emailAddress)
  this.db.add(order.emailAddress, order)
};

Truck.prototype.deliverOrder = function (customerid){
  console.log('Delivering order for '+ customerid);
  this.db.remove(customerid)
};

Truck.prototype.printOrders = function (){
  var costomerIDArray = Object.keys(this.db.getAll());
  console.log('Truck #'+ this.truckid + ' has pending orders: ');
  costomerIDArray.forEach(function  (id) {
  console.log(this.db.get(id));
}.bind(this));
};

  App.Truck = Truck;
  window.App = App;
})(window)
