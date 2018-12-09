(function (window) {
'use strict';
var FORM_SELECTOR = '[data-coffee-order="form"]';
var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
var App = window.App;
var Truck = App.Truck;
var DataStore = App.DataStore;
var FormHandler = App.FormHandler;
var CheckList = App.CheckList;
var myTruck = new Truck('order for me', new DataStore());
window.myTruck = myTruck;
var checkList = new CheckList(CHECKLIST_SELECTOR);
window.ckeckList = checkList;
checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));


var FormHandler = new FormHandler(FORM_SELECTOR);

var changeColorSlider = function(event){
  event.preventDefault();
  changeColorSliderCommon();
};
var changeValueSlider = function(event){
  event.preventDefault();
  changeValueSliderCommon();
};


function changeValueSliderCommon(){
  $('#forvalueid').text($('#strengthLevel').val());
}

function changeLabelColorCommon (flavor, label) {
  if (flavor === 'caramel') {
    label.css('color', '#AE7324');
  } else if (flavor === 'almond') {
    label.css('color', '#63410F');
  } else if (flavor === 'mocha') {
    label.css('color', '#A1600F');
  };
}

function changeColorSliderCommon () {
  var curren_val = $('#strengthLevel').val();
  if (curren_val <= 30){
    $('#forvalueid').css("color","#82da55");
  }else if (curren_val < 70) {
    $('#forvalueid').css("color","#f9fb08");
  }else if (curren_val > 70) {
    $('#forvalueid').css("color","#fb0404");
  }
}

checkList.addClickHandler(function(items){
  changeLabelColorCommon(items['flavor'], $('#label'));
  changeColorSliderCommon();
  changeValueSliderCommon();
})

FormHandler.addSubmitHandler(function(data){
  myTruck.createOrder.call(myTruck,data);
  checkList.addRow.call(checkList, data);
  this.reset();
  changeValueSliderCommon();
  changeColorSliderCommon();
});


FormHandler.addChangeHendler("#strengthLevel", 'input change', changeValueSlider);
FormHandler.addChangeHendler("#strengthLevel", 'input change', changeColorSlider);
console.log(FormHandler);
})(window);
