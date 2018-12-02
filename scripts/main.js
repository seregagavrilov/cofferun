(function (window) {
'use strict';
var FORM_SELECTOR = '[data-coffee-order="form"]';
var App = window.App;
var Truck = App.Truck;
var DataStore = App.DataStore;
var FormHandler = App.FormHandler;
var myTruck = new Truck('order for me', new DataStore());
window.myTruck = myTruck;
var FormHandler = new FormHandler(FORM_SELECTOR);
var changeColorSlider = function(event){
  event.preventDefault();
  var curren_val = $(this).val();
  if (curren_val < 30){
    $('#forvalueid').css("color","#82da55");
  }else if (curren_val < 70) {
    $('#forvalueid').css("color","#f9fb08");
  }else if (curren_val > 70) {
    $('#forvalueid').css("color","#fb0404");
  }
};
var changeValueSlider = function(event){
  event.preventDefault();
  $('#forvalueid').text($(this).val());
};
FormHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));

FormHandler.addChangeHendler("#strengthLevel", changeValueSlider);
FormHandler.addChangeHendler("#strengthLevel", changeColorSlider);
console.log(FormHandler);
})(window);
