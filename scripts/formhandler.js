(function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector){
    if (!selector){
      throw new Error('No selector provide')
    }
    this.$formElement = $(selector)
    if (this.$formElement.length ===0){
      throw new Error('Cold not find element with selector: '+ selector);
    }
  }
  FormHandler.prototype.addChangeHendler = function(selector, currentEvent, func){
      var element = this.$formElement.find(selector);
      element.on(currentEvent, func);
    };

  FormHandler.prototype.addSubmitHandler = function(fn){
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function(event){
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function(item){
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      fn.call(this, data);
      this.reset();
      this.elements[0].focus();
    });
  };
  App.FormHandler = FormHandler;
  window.App = App;
})(window);
